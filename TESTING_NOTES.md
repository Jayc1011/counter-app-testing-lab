cat << 'EOF' > TESTING_NOTES.md
# Exploratory and White Box Testing Notes

## Step 1: Exploratory Testing

### Testing Charter
Investigate the counter application's initial display, single and repeated Increment and Decrement actions (including negative values), Reset behavior after changing the count, and continued button interactions after a reset—without viewing the source code first.

| Action | Expected Result | Actual Result | Pass or Fail |
| --- | --- | --- | --- |
| Load the app initially | Count starts at `0` and Increment, Decrement, and Reset buttons appear | Count displayed as `0` with Increment, Decrement, and Reset buttons visible | Pass |
| Click Increment once | Count increases from `0` to `1` | Count updated from `0` to `1` | Pass |
| Click Decrement once from `0` | Count decreases from `0` to `-1` | Count updated from `0` to `-1` | Pass |
| Click Increment multiple times in a row | Count increases by 1 on each click | Count incremented by 1 per click as expected | Pass |
| Click Reset after changing count away from `0` | Count returns to `0` | Count returned to `0` | Pass |
| Click Increment or Decrement after Reset | Count updates from `0` according to the button clicked | Count updated cleanly from `0` | Pass |

*(Replace or refine any row above with your exact browser observations if you noticed anything different.)*

## Step 2: Examine the Source Code

- **Starting value of `count`:** `0` (`const [count, setCount] = useState(0)`).
- **Statements that change `count` and their triggering actions:**
  - `setCount(count + 1)` — triggered by clicking the **Increment** button.
  - `setCount(count - 1)` — triggered by clicking the **Decrement** button.
  - `setCount(0)` — triggered by clicking the **Reset** button.
- **Branches or loops:** None. `App.tsx` contains no `if`/`else`, switch statements, ternary branches, or loops (`for`/`while`/`.map` over dynamic loops).
- **Do branch coverage and loop coverage apply?** Neither conditional branch coverage nor loop coverage meaningfully applies to `App.tsx` because there are no decision branches or loops in the component logic (any reported branch metric on a branchless component has 0 executable branches, and there are 0 loops to iterate over).

## Step 3: Create the Test File

Created `src/App.test.tsx` using `@testing-library/react` (`render`, `screen`), `@testing-library/user-event` (`userEvent`), and `@testing-library/jest-dom` matchers inside a `describe` block.

## Step 4: Test the Starting State

Added a test verifying initial render displays `Count: 0` along with the **Increment**, **Decrement**, and **Reset** buttons.

## Step 5: Test Statement Coverage

Added tests covering:
- **Increment** changing count from `0` to `1`.
- **Decrement** changing count from `0` to `-1`.
- **Reset** changing count from a non-zero value (`2`) back to `0`.

## Step 6: Test a Sequence of Actions

Added a sequential test that increments multiple times, resets to `0`, and then decrements afterward while asserting the count after key steps.

## Step 7: Run the Tests

Command: `npm test` (result: 1 test suite passed, 4 tests passed). Remember to attach/save your screenshot of the `npm test` run for your submission.

## Step 8: Review Code Coverage

Command: `npm test -- --coverage` (remember to attach/save your screenshot of the coverage report).

| Coverage Type | Percentage |
| ------------- | ---------- |
| Statements | 100% |
| Branches | 100% |
| Functions | 100% |
| Lines | 100% |

- **Parts of the component executed:** Initial render (`Count: 0` and all three buttons) and all three button click handlers (`Increment`, `Decrement`, and `Reset`), including negative values and post-reset updates.
- **Any statements remaining untested:** None (`0` uncovered lines in `src/App.tsx`).
- **Why few or no branches are reported:** `App.tsx` has no conditional branches (`if`/`else` or ternaries), so there are no conditional branch paths to split execution.
- **Does percentage alone prove the component works correctly?** No. 100% coverage shows every line/statement in `App.tsx` ran during the tests, not that every possible user workflow, accessibility detail, layout/styling behavior, or edge case under heavy/rapid input is free of defects.

## Step 9: Compare the Two Approaches

- **Test idea from exploratory testing:** Checking that clicking **Decrement** from `0` moves into negative numbers (`-1`) and that clicking **Decrement** or **Increment** right after **Reset** works without getting stuck at `0`.
- **Test idea from reading the source code:** Checking that `setCount(count + 1)`, `setCount(count - 1)`, and `setCount(0)` each directly compute from the current state/constant rather than clamping at `0` or stepping by more than `1`.
- **How viewing the code changed testing:** It confirmed there were no hidden bounds or conditional branches in `App.tsx`, making it clear that targeted tests for initial render and each of the three state setter handlers cover the component's logic.
- **Limitation of each approach:**
  - *Exploratory testing:* Manual, harder to repeat identically across runs, and doesn't give automated line/statement coverage metrics.
  - *White-box testing:* Tied to how the code is currently written and can miss broader UX or integration issues outside the tested code paths.
EOF