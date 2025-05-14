import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final IconData? iconData;
  final Widget? iconWidget;
  final String text;
  final VoidCallback onTap;

  const CustomButton({
    super.key,
    this.iconData,
    this.iconWidget,
    required this.text,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: onTap,
      style: OutlinedButton.styleFrom(
        minimumSize: const Size.fromHeight(48),
        side: const BorderSide(color: Colors.green),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (iconWidget != null) iconWidget!,
          if (iconData != null) Icon(iconData, size: 20),
          const SizedBox(width: 10),
          Text(text),
        ],
      ),
    );
  }
}
