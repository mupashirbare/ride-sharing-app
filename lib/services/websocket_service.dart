import 'dart:async';
import 'dart:convert';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class WebSocketService {
  static WebSocketService? _instance;
  late WebSocketChannel _channel;
  final _messageController = StreamController<Map<String, dynamic>>.broadcast();
  bool _isConnected = false;

  WebSocketService._();

  static WebSocketService get instance {
    _instance ??= WebSocketService._();
    return _instance!;
  }

  Stream<Map<String, dynamic>> get messageStream => _messageController.stream;

  Future<void> connect(String token) async {
    if (_isConnected) return;

    final wsUrl = '${dotenv.env['WS_URL'] ?? 'ws://localhost:5000'}?token=$token';
    
    try {
      _channel = WebSocketChannel.connect(Uri.parse(wsUrl));
      _isConnected = true;

      _channel.stream.listen(
        (message) {
          try {
            final data = jsonDecode(message);
            _messageController.add(data);
          } catch (e) {
            print('Error parsing WebSocket message: $e');
          }
        },
        onError: (error) {
          print('WebSocket error: $error');
          _isConnected = false;
          _reconnect(token);
        },
        onDone: () {
          print('WebSocket connection closed');
          _isConnected = false;
          _reconnect(token);
        },
      );
    } catch (e) {
      print('Failed to connect to WebSocket: $e');
      _isConnected = false;
      _reconnect(token);
    }
  }

  void _reconnect(String token) {
    Future.delayed(const Duration(seconds: 5), () {
      if (!_isConnected) {
        connect(token);
      }
    });
  }

  void sendMessage(String type, Map<String, dynamic> payload) {
    if (!_isConnected) return;

    try {
      _channel.sink.add(jsonEncode({
        'type': type,
        'payload': payload,
      }));
    } catch (e) {
      print('Error sending WebSocket message: $e');
    }
  }

  void updateLocation(double latitude, double longitude) {
    sendMessage('location_update', {
      'latitude': latitude,
      'longitude': longitude,
    });
  }

  void requestRide(Map<String, dynamic> pickup, Map<String, dynamic> destination) {
    sendMessage('ride_request', {
      'pickup': pickup,
      'destination': destination,
    });
  }

  void updateRideStatus(String rideId, String status) {
    sendMessage('ride_status_update', {
      'rideId': rideId,
      'status': status,
    });
  }

  void dispose() {
    if (_isConnected) {
      _channel.sink.close();
      _isConnected = false;
    }
    _messageController.close();
  }
} 