# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-02-12

### Added

- Audio and haptic feedback on game interactions
- Confetti celebration component on game wins
- iOS `bundleIdentifier` configuration (`com.hezron.connect3`)

### Changed

- Upgraded to **Expo SDK 54** (from SDK 53)
- Upgraded **React Native** to `0.81.5` (from `0.79.5`)
- Upgraded **React** to `19.1.0` (from `19.0.0`)
- Upgraded `react-native-reanimated` to `~4.1.1` (from `~3.17.5`)
- Upgraded `react-native-screens` to `~4.16.0` (from `~4.11.1`)
- Upgraded `react-native-gesture-handler` to `~2.28.0` (from `~2.24.0`)
- Upgraded `react-native-safe-area-context` to `~5.6.0` (from `5.4.0`)
- Upgraded `react-native-svg` to `15.12.1` (from `15.11.2`)
- Upgraded `@expo/vector-icons` to `^15.0.3` (from `^14.1.0`)
- Upgraded `@react-native-async-storage/async-storage` to `2.2.0` (from `2.1.2`)
- Upgraded `typescript` to `~5.9.2` (from `~5.8.3`)
- Upgraded `@types/react` to `~19.1.10` (from `~19.0.14`)
- Upgraded `eslint-config-expo` to `~10.0.0` (from `~9.2.0`)
- Refactored root layout to use a single `ThemeProvider` wrapper for both the welcome screen and main app flow
- Bumped app version to `1.0.1` in `package.json` and `app.json`
- Renamed package from `TicTacToe` to `tic-tac-toe`

### Added (new dependencies)

- `react-native-worklets` (`0.5.1`)

---

## [1.0.0] - Initial Release

### Core Game

- Implemented Tic Tac Toe game board, cells, and header components
- Game logic with placement and movement phases
- State management via `GameProvider` context
- Winning line animation and game reset handling
- Three game levels with detailed level selector
  - Level 3 features straight-line piece movement
- Game over popup with results display

### UI & Theming

- Theme management with `ThemeProvider` (automatic light/dark mode)
- Welcome screen with onboarding flow
- Page headers and navigation structure
- Edge-to-edge Android support
- Custom splash screen with `#050E18` background
- Google Fonts integration (Inter)
- Lucide icons via `lucide-react-native`
- Expo Linear Gradient for visual effects
- Expo Blur for glassmorphism effects

### Data & Persistence

- SQLite database integration via `drizzle-orm` and `expo-sqlite`
- Drizzle ORM migrations setup
- Drizzle Studio plugin for development debugging
- Game stats tracking and persistence
- Coin management system (earn, spend, display)
- Welcome bonus feature with database schema support

### Achievements & Rewards

- Achievements system with `AchievementsProvider` context
- Achievement notification popup component
- Coin popup for reward display
- Session management for tracking progress

### Audio & Feedback

- Audio feedback system via `AudioProvider` context using `expo-av`
- Haptic feedback integration via `expo-haptics`

### Settings & Stats

- Settings screen with game mode selector
- Stats screen with detailed statistics display
- Footer component for settings and stats screens

### Infrastructure

- Expo Router for file-based routing with typed routes
- EAS Build & Update configuration
- ESLint configuration
- Babel configuration with inline import plugin
- Async Storage for local key-value persistence
- Expo Dev Client for development builds
