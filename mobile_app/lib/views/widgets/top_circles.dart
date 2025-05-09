import 'package:flutter/material.dart';

class TopCircles extends StatelessWidget {
  const TopCircles({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // 🟢 Light green goes first (below)
        Positioned(
          top: -120,
          right: -40,
          child: Container(
            width: 210,
            height: 210,
            decoration: const BoxDecoration(
              color: Color(0xFFACD9B2), // light green
              shape: BoxShape.circle,
            ),
          ),
        ),

        // 🟢 Dark green goes second (on top)
        Positioned(
          top: -160,
          right: -80,
          child: Container(
            width: 240,
            height: 240,
            decoration: const BoxDecoration(
              color: Color(0xFF0C8A4B), // dark green
              shape: BoxShape.circle,
            ),
          ),
        ),
      ],
    );
  }
}
