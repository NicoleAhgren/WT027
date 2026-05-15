# Assignment WT - Web for Data Science

## Project Name

Streamify

## Objective

Create a functional, visually engaging, and *interactive* data visualization web application that consumes the API you built in the previous assignment. The application must authenticate users via OAuth and be publicly accessible.

Streamify is a music data visualization web application that consumes a GraphQL API built on Spotify chart data. It lets users browse and search through thousands of songs, explore an interactive bar chart of the top 20 most streamed songs, and save personal playlists. The application provides insights into streaming numbers, peak chart positions, and top 10 appearances for each track.

## Deployed Application

> URL: https://wt027.onrender.com

## Requirements

See [all requirements in Issues](../../issues/). Close issues as you implement them. Create additional issues for any custom functionality.

### Functional Requirements

| Requirement | Issue | Status |
|---|---|---|
| API Integration — the app consumes your WT1 API | [#14](../../issues/14) | :white_check_mark: |
| OAuth Authentication — users log in via OAuth 2.0 | [#15](../../issues/15) | :white_check_mark: |
| Interactive data visualization with aggregation/adaptation for 10 000+ data points | [#11](../../issues/11) | :white_check_mark: |
| Efficient loading — pagination, lazy loading, loading indicators | [#13](../../issues/13) | :white_check_mark: |

### Non-Functional Requirements

| Requirement | Issue | Status |
|---|---|---|
| Clear and well-structured code | [#1](../../issues/1) | :white_check_mark: |
| Code reuse | [#2](../../issues/2) | :white_check_mark: |
| Dependency management and scripts | [#3](../../issues/3) | :white_check_mark: |
| Source code documentation | [#4](../../issues/4) | :white_check_mark: |
| Coding standard | [#5](../../issues/5) | :white_check_mark: |
| Examiner can follow the creation process | [#6](../../issues/6) | :white_check_mark: |
| Publicly accessible over the internet | [#7](../../issues/7) | :white_check_mark: |
| Keys and tokens handled correctly | [#8](../../issues/8) | :white_check_mark: |
| Complete assignment report with correct links | [#9](../../issues/9) | :white_check_mark: |

### VG — AI/ML Feature (optional)

For a VG grade, integrate **one** AI/ML feature into the application. Pick one below or propose your own of similar scope. See the [VG issue](../../issues/12) for full details and acceptance criteria.

| Option | Status |
|---|---|
| Semantic Search — natural language queries matched by meaning | :white_large_square: |
| Content-Based Recommendations — "items similar to this one" | :white_large_square: |
| Sentiment Analysis — analyze and visualize text sentiment | :white_large_square: |
| Text Summarization / Generation — LLM-powered summaries | :white_large_square: |
| Clustering & Grouping — auto-group similar items visually | :white_large_square: |
| RAG — natural language Q&A grounded in your dataset | :white_large_square: |
| Other: *describe* | :white_large_square: |

## Core Technologies Used

| Layer | Technology | Reason |
|---|---|---|
| **Visualization** | Chart.js | Simple, well-documented library for interactive bar charts with click events |
| **Front-end** | Vanilla HTML/CSS/JavaScript | MVC architecture with ES modules, no framework needed for this scope |
| **Styling** | Custom CSS | Hand-written CSS with variables for consistent theming |
| **Backend** | Express.js | Lightweight Node.js server for GitHub OAuth handling |
| **Authentication** | GitHub OAuth 2.0 + JWT | Secure login flow with server-side code exchange |
| **Data** | GraphQL (Apollo) | Querying the WT1 API built in the previous assignment |

## How to Use

- **Browse songs** — The home page shows 20 songs per page. Use the search bar to filter by song title or artist name.
- **Add to playlist** — Click the `+` button on any song card to save it to your personal playlist.
- **Top Chart** — Navigate to Top Chart to see a bar chart of the 20 most streamed songs. Hover over a bar for streaming numbers, click a bar to see detailed stats (peak position, top 10 appearances) and add it to your playlist.
- **My Playlist** — View, favourite (❤️), and delete (🗑️) songs you have saved.
- **Login** — Click Login in the top right corner and authenticate via GitHub.

## Acknowledgements

- Song data sourced from Spotify chart statistics via the WT1 GraphQL API
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Express.js](https://expressjs.com/) for the backend server
