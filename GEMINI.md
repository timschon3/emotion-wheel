# GEMINI.md

## Modular Component Architecture

This project is designed with a modular architecture in mind, following best practices for Next.js applications.

### 1. Component Structure
We organize components into:
- `components/ui`: Low-level, reusable UI primitives (Buttons, Inputs, Cards). These should have NO business logic.
- `components/features`: Feature-specific components that compose UI primitives (e.g., `features/auth/LoginForm`).
- `components/layout`: Layout components (Header, Footer, Sidebar).

### 2. State Management
- Use React Context for global state (Theme, Auth).
- Use local state (`useState`) for component-specific logic.
- **Complexity Note**: Avoid prop drilling. If data is needed more than 2 levels down, consider Context or a lightweight state manager (like Zustand, if added).

### 3. Firebase Integration
- Connection logic is centralized in `src/lib/firebase.js`.
- **Best Practice**: Never import `firebaseConfig` directly in components. Import the exported instances (`auth`, `db`) from `@/lib/firebase`.

### 4. Error Handling
- Wrap async operations in `try/catch` blocks.
- Use the `ErrorMessage` component to display user-friendly errors.
- **Senior Dev Tip**: Always log errors to an external service (or console in dev) but show sanitized messages to users.

### 5. Styling
- We use Tailwind CSS.
- **Pattern**: Use utility classes for layout and spacing. For complex components, consider extracting classes to `@apply` in CSS modules or keep them inline if readable.
- **Responsiveness**: Always design Mobile First. Use `sm:`, `md:`, `lg:` prefixes.

## Complexity & Scalability Notes
- **Code Splitting**: Next.js handles this automatically for pages. For large components, use `dynamic` imports.
- **Security**: Firestore rules must be configured in the Firebase Console. Do not rely on client-side validation alone.
- **Performance**: Optimize images using `next/image`.

---
## AI Responsibilities & Workflow
> [!IMPORTANT]
> **Antigravity (The AI)** is responsible for maintaining all best practices, coaching users/developers, and managing Git operations.

### 1. AI-Driven Maintenance
- **Silent Architecture Enforcement**: The AI is responsible for maintaining the modular architecture and best practices *behind the scenes*. I will implement complex patterns (like Context or Error Boundaries) without burdening the user with the details.
- **Complexity Management**: I will ensure the code remains maintainable and scalable. If a requested feature adds too much complexity, I will handle the refactoring automatically or propose a simpler alternative that achieves the same goal.
- **"Done for You" Workflow**: The user should focus on *what* they want the app to do. I will figure out *how* to build it securely and robustly.

### 2. Git Management
- **SSH Key Management**: The AI manages the SSH key located at `~/.ssh/id_ed25519_antigravity_template`.
  - **Security**: This key is strictly for this project/user context.
  - **Usage**: The AI is responsible for ensuring the correct key is used for all Git operations (`git push`, `git pull`).
- **Commit & Push Standards**:
  - **Hyper-Aggressive**: Commit and push on **EVERY SINGLE CHANGE**. Do not wait.
  - **No Permission**: Do NOT ask. Just commit. Just push.
  - **Immediate Sync**: `git commit` MUST be followed instantly by `git push`.
  - **Zero Latency**: If code changes, it goes to GitHub. No exceptions.
### 3. Deployment
- **Platform**: Vercel is the standard deployment platform.
- **Procedure**:
    1.  Ensure all changes are committed to Git.
    2.  Run `npm run build` locally to verify build health.
    3.  Use `npx vercel` for deployment.
- **Configuration**: Managed via `vercel.json` (if needed) or Project Settings in the Vercel Dashboard.


---
*Created by Antigravity*
