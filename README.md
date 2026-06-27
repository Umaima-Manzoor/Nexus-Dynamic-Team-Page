# TeamFlow – Dynamic Team Page (JSON/API Based)

A fully responsive, dynamic team page that fetches team member data from a JSON file using the Fetch API. Built with HTML, CSS, and vanilla JavaScript.

<br>

## 📋 Task Requirements – Fully Fulfilled

| Requirement | Status |
|-------------|--------|
| JSON file with team members (id, name, role, image_url, bio, social_links) | ✅ |
| Fetch data using Fetch API / AJAX | ✅ |
| Parse and display dynamically | ✅ |
| Card/Grid layout | ✅ |
| Each card includes: image, name, role, short bio, social icons | ✅ |
| Hover effects on cards | ✅ |
| Smooth animations | ✅ |
| Responsive design (mobile-first) | ✅ |
| Modal popup with full profile (optional) | ✅ |
| Filter by role (optional) | ✅ |
| Search by name (optional) | ✅ |
| Lazy loading images (optional) | ✅ |
| Empty state when no results | ✅ |

<br>

## 🛠️ Technologies Used

- **HTML5** – Semantic markup
- **CSS3** – Flexbox, CSS Grid, Custom Properties, Transitions
- **Vanilla JavaScript** – Fetch API, DOM manipulation, Event Listeners
- **Font Awesome 6** – Social media icons
- **Google Fonts** – Inter

<br>

## 📁 Project Structure
```
├── index.html # Main HTML page
├── script.js # Fetch, render, search, filter, modal logic
├── styles.css # Mobile-first CSS with responsive design
├── team.json # Team member data
├── README.md # This file
└── Screenshots/ # Desktop, mobile, and proof screenshots
   ├── desktop-view.png
   ├── mobile-view.png
   └── code-proof.png
```


<br>

## 🧩 Key Features

### Dynamic Data Loading
- **JSON Data Source** – All team member data is stored in `team.json` with fields: id, name, role, image_url, bio, social_links.
- **Fetch API** – Data is loaded asynchronously using `fetch()` with proper error handling.
- **Dynamic Rendering** – Team cards are generated and injected into the DOM using JavaScript.

<br>

### Card Layout
- **Image** – Circular profile image with lazy loading.
- **Name & Role** – Clean typography with role badge.
- **Bio** – Short description (truncated to 2 lines on card).
- **Social Links** – GitHub, LinkedIn, Twitter icons with hover effects.
- **Click to Expand** – Click any card to open a full-profile modal.

<br>

### Search & Filter
- **Search by Name** – Real-time filtering as you type.
- **Filter by Role** – Dynamic filter buttons generated from unique roles in the data.
- **Empty State** – Friendly message when no members match your search.
- **Reset Filters** – Clear all filters with one click.

<br>

### Modal Popup
- **Full Profile** – Shows larger image, complete bio, and all social links.
- **Smooth Animation** – Fades in with scale transition.
- **Close Options** – Click the × button, click outside the modal, or press the Escape key.

<br>

### Responsive Design (Mobile-First)
| Screen Size | Grid Columns |
|-------------|--------------|
| Mobile (< 768px) | 1 column |
| Tablet (≥ 768px) | 2 columns |
| Desktop (≥ 1024px) | 3 columns |

<br>

## 🧪 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Umaima-Manzoor/TeamFlow.git
   cd TeamFlow
   ```
2. Open the project
- Double‑click index.html to open in your browser, or
- Use a local development server (e.g., VS Code Live Server)

3. No dependencies or build tools required – it just works.

<br>

## 📸 Screenshots
Screenshots of desktop view, mobile view, and page source are included in the Screenshots/ folder.

<br>

## 👩‍💻 Author
Umaima Manzoor – [My GitHub](https://github.com/Umaima-Manzoor/)

<br>

## 📄 License
MIT
