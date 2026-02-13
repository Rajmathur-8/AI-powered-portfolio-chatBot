# AI-Powered Portfolio with Co-Browsing Assistant

An interactive portfolio website featuring an AI-powered chatbot assistant that can navigate, explain, and interact with the portfolio content using Google's Gemini AI.

## Features

### 🤖 AI Co-Browsing Assistant
- **Natural Conversation**: Engage in context-aware conversations about the portfolio
- **Intelligent Navigation**: AI can scroll to sections, highlight elements, and guide users
- **Form Assistance**: Help users fill out contact forms with smart suggestions
- **Content Extraction**: Dynamically reads and understands page content
- **Tool-Based Actions**: Executes actions through a robust function calling system

### 🎨 Modern Portfolio Design
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Engaging animations and transitions
- **Professional Sections**: Hero, About, Skills, Projects, Experience, and Contact
- **Interactive Elements**: Hover effects, scroll animations, and visual feedback

### ⚡ Technical Highlights
- **Next.js 16**: Built with the latest Next.js App Router
- **Gemini 2.5 Flash**: Powered by Google's advanced AI model
- **Function Calling**: Structured tool usage for reliable actions
- **Real-time Interaction**: Seamless communication between frontend and AI
- **Modular Architecture**: Clean, maintainable component structure

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js          # API endpoints for chat functionality
│   ├── components/
│   │   ├── ActionExecutor.jsx    # Handles tool execution
│   │   ├── ActionExecutor.css
│   │   ├── ChatBot.jsx            # Main chatbot interface
│   │   ├── ChatBot.css
│   │   ├── ChatToggle.jsx         # Chat toggle button
│   │   ├── ChatToggle.css
│   │   ├── Portfolio.jsx          # Portfolio content
│   │   └── Portfolio.css
│   ├── globals.css
│   ├── globals-extended.css
│   ├── layout.jsx
│   └── page.jsx                   # Main application page
├── lib/
│   ├── gemini.js                  # Gemini AI configuration
│   └── tools.js                   # Tool definitions for AI
├── public/
│   └── ...                        # Static assets
├── package.json
└── README.md
```

## AI Tools & Capabilities

The AI assistant has access to the following tools:

### Navigation Tools
- **scroll_to_section**: Navigate to portfolio sections (hero, about, skills, projects, experience, contact)
- **scroll_page**: Scroll up, down, to top, or to bottom
- **focus_element**: Center and focus on specific elements

### Interaction Tools
- **highlight_element**: Draw attention to elements with visual effects
- **click_element**: Click buttons and links
- **fill_input**: Fill form fields with text

### Information Tools
- **extract_website_content**: Extract structured content from sections
- **get_page_content**: Get text content from the page
- **get_element_info**: Retrieve element details
- **query_element**: Find and inspect multiple elements

## How It Works

### 1. User Interaction
Users interact with the AI chatbot through a fixed chat interface in the bottom-right corner of the screen.

### 2. AI Processing
- User messages are sent to the backend API (`/api/chat`)
- The Gemini AI model processes the message with conversation context
- AI decides which tools (if any) to use based on the request

### 3. Tool Execution
- AI returns tool calls to the frontend
- `ActionExecutor` component executes the requested actions
- Results are sent back to the AI for follow-up responses

### 4. Conversational Flow
- AI maintains conversation history for context
- Provides natural, contextual responses
- Can chain multiple tools for complex tasks

## Customization

### Updating Portfolio Content

Edit `app/components/Portfolio.jsx` to customize:
- Personal information (name, title, description)
- About section content
- Skills and technologies
- Project details
- Work experience
- Contact information

### Styling

Modify CSS files in `app/components/` to change:
- Color scheme (CSS variables in `:root`)
- Typography
- Layout and spacing
- Animation effects

### AI Behavior

Adjust the system instruction in `lib/gemini.js` to customize:
- AI personality and tone
- Response formatting preferences
- Tool usage patterns
- Conversational style

### Adding New Tools

1. Define the tool in `lib/tools.js`:
```javascript
{
  name: 'your_tool_name',
  description: 'Tool description',
  parameters: {
    // Parameter schema
  }
}
```

2. Implement the tool handler in `app/components/ActionExecutor.jsx`:
```javascript
case 'your_tool_name':
  result = await yourToolFunction(parameters);
  break;
```

## API Endpoints

### POST /api/chat
Send user messages and receive AI responses with potential tool calls.

**Request Body:**
```json
{
  "message": "User message",
  "conversationHistory": [...],
  "pageContent": "Current page content",
  "sectionId": "optional-section-id"
}
```

**Response:**
```json
{
  "message": "AI response",
  "toolCalls": [...],
  "requiresAction": boolean
}
```

### PUT /api/chat
Send tool execution results back to AI for follow-up responses.

**Request Body:**
```json
{
  "toolResults": [...],
  "conversationHistory": [...]
}
```

## Technologies Used

- **Frontend**: React 19, Next.js 16
- **Styling**: CSS3, CSS Variables, Responsive Design
- **AI**: Google Gemini 2.5 Flash API
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: Next.js API Routes
- **Language**: JavaScript (JSX)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Debounced scroll events
- Lazy loading of chat components
- Optimized animations with CSS
- Efficient DOM queries
- Minimal re-renders with proper state management

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management
- Reduced motion support
- High contrast mode compatibility

## Development

### Available Scripts

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Troubleshooting

### AI Not Responding
- Check that `NEXT_PUBLIC_GEMINI_API_KEY` is set correctly
- Verify API key has proper permissions
- Check browser console for errors

### Tools Not Executing
- Ensure element selectors are correct
- Check that elements exist on the page
- Review browser console for execution errors

### Styling Issues
- Clear browser cache
- Check CSS specificity conflicts
- Verify CSS variables are defined

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for powering the intelligent assistant
- Next.js team for the excellent framework
- Lucide React for beautiful icons
- The open-source community for inspiration

## Contact

For questions, suggestions, or issues, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and Google Gemini AI**
