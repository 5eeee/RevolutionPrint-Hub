# RevolutionPrint Hub - Complete Website

This is a fully functional website for RevolutionPrint Hub with all the required features implemented according to the technical specification.

## Features Implemented

### 1. DTF Calculator (Main Functionality)
- Interactive calculator for DTF printing
- Multiple print blocks with "+" button to add more
- Width and height inputs (no standard formats like A1, A2, etc.)
- Automatic area calculation
- Single/double-sided printing toggle
- Easy/complex transfer selection
- Automatic meterage calculation
- Automatic pricing based on meterage:
  - 1–5 м: 1100 р
  - 5–10 м: 1000 р
  - 10–30 м: 900 р
  - 30–50 м: 850 р
  - 50–100 м: 800 р
  - 100–1000 м: 750 р

### 2. Clothing Calculator (Separate Tab)
- Product type selection (t-shirt, hoodie, sweatshirt, tank-top)
- Fabric composition (cotton, synthetic, mixed)
- Fabric weight input
- Color selection
- Size selection (S to XXXL + custom)
- Quantity input
- Automatic pricing based on quantity brackets:
  - 10–100: 600 (for t-shirts)
  - 101–300: 500
  - 301–500: 450
  - 501–1000: 370
  - 1000+: 300
- "Submit Request" button

### 3. Commercial Proposal (KP)
- "Generate KP" button in the navigation bar
- Shows date and time of generation
- Includes all DTF and clothing calculation data
- Shows total cost

### 4. Productions Module
- Separate tab for productions
- Ability to add multiple production tabs
- Production information (name, contacts, status)
- Services selection (DTF, screen printing, etc.)
- Task management with "Accept" and "Complete" buttons

### 5. Orders Tab
- Table with order information
- Columns: Order #, Client, Meters, Items, Price, Status, Actions
- "Inflate" button with fireworks animation
- When clicked, increases price by 10% and shows fireworks

### 6. Telegram Bot Integration
- Uses the provided bot token: 8128397217:AAGzNT7FfATcBqTIHwuyMjVbE2NMfB4i3bg
- Sends notifications about new orders
- Sends notifications about DTF calculations
- Sends status updates

## How to Run the Website

1. Navigate to the src directory:
```bash
cd /workspace/src
```

2. Start a local server (using Python):
```bash
# For Python 3
python3 -m http.server 8000
```

Or use the provided server script:
```bash
cd /workspace
python3 server.py
```

3. Open your browser and go to:
```
http://localhost:8000
```

## File Structure

```
/workspace/src/
├── index.html              # Main HTML file with all tabs
├── css/
│   └── style.css          # Custom styles
└── js/
    ├── main.js            # Main application logic
    ├── dtf-calculator.js  # DTF calculator functionality
    ├── clothing-calculator.js # Clothing calculator functionality
    ├── productions.js     # Productions module functionality
    ├── orders.js          # Orders tab functionality
    ├── telegram-bot.js    # Telegram bot integration
    └── kp-generator.js    # Commercial proposal generator
```

## Technical Details

- Uses Bootstrap 5 for responsive design
- Uses Font Awesome for icons
- Pure JavaScript (no external dependencies except Bootstrap and Font Awesome via CDN)
- All calculations happen client-side
- Fireworks animation for "Inflate" button
- Tab-based navigation system
- Real-time calculations as you type
- Responsive design for mobile and desktop

The website is fully functional and ready for production use!
