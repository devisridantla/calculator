# Modern iOS-Style Calculator

A sleek, responsive, and minimalist web calculator inspired by the Apple iOS calculator design. Built from scratch with pure HTML5, modern CSS Grid, and vanilla JavaScript (no external libraries or frameworks).

![Modern Calculator Preview](https://raw.githubusercontent.com/devisridantla/calculator/main/preview.png) *(Optional preview screenshot)*

## ✨ Features

- **Minimalist Dark Mode UI**: Authentic iOS color palette with deep charcoal surfaces, slate number pads, and vibrant orange math operators.
- **CSS Grid Layout**: Responsive 4-column grid with a wide, dual-column `0` pill button.
- **Active Operator Feedback**: Highlights active math operators (`+`, `−`, `×`, `÷`) when selected.
- **Robust Math Engine**:
  - Multiple decimal prevention (e.g. prevents `1.2.3`).
  - Leading zero normalization.
  - Division by zero error handling.
  - Floating-point arithmetic precision correction (`0.1 + 0.2 = 0.3`).
  - Thousands comma separation (`1,000,000`).
- **Physical Keyboard Support**: Type directly using number keys, operators, `Enter`, `Backspace`, and `Escape`.

## 📁 Project Structure

```text
calculator/
├── index.html    # Semantic HTML structure & accessible display screen
├── style.css     # CSS Grid layout & design tokens
├── script.js     # Object-Oriented calculator engine & DOM handlers
└── README.md     # Project documentation
```

## 🚀 Getting Started

1. Clone or download this repository:
   ```bash
   git clone https://github.com/devisridantla/calculator.git
   ```
2. Open `index.html` in any modern web browser (Chrome, Edge, Safari, Firefox).
3. No build tools or installations required!

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `0` – `9` | Number input |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Add, Subtract, Multiply, Divide |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last digit |
| `Escape` | All Clear (AC) |

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
