# Plan: Refactoring FullFormalReport to Modular Architecture

To improve maintainability and allow the user to follow functions one by one, we will split the 1000-line `FullFormalReport.jsx` into 4 specialized components and a main orchestrator.

## Proposed Changes

### [NEW] Shared Report Components
#### `FullReportComponents.jsx`
Extracted shared UI blocks to ensure consistency across all sub-pages.
- `Page`: The A4 shell with header/footer.
- `DataItem`: Standardized data rows.
- `CVSSBadge`: Security scoring badge.
- `chunkArray`: Utility for splitting data for pagination.

### [NEW] Part 1: First Impressions
#### `FullReportFirstPage.jsx`
- `CoverPage`: The "Harika" cover with the blue shield and centered domain.
- `TableOfContents`: Sequential S1-S12 indexing.

### [NEW] Part 2: Standard Forensic Sections
#### `FullReportStandartPage.jsx`
Handles the first half of the forensic audit (S1-S6):
- S1: IP Resolution
- S2: Port Scanning
- S3: HTTP Headers
- S4: Sensitive Paths
- S5: Subdomain Discovery (Paginated chunks)
- S6: SSL Labs Analysis

### [NEW] Part 3: Next-Gen Analytics
#### `FullReportNextGenPage.jsx`
Handles the second half of the forensic audit (S7-S12):
- S7: WHOIS/RDAP
- S8: Cookie Security
- S9: CORS Policy
- S10: Tech Stack
- S11: Geo-IP
- S12: Reputation Check

### [NEW] Part 4: Finalization & Signature
#### `FullReportLastPage.jsx`
- `TechnicalDump`: JSON Evidence dossier.
- `LegalPage`: Disclaimers and usage terms.
- `FinalPage`: Official approval, QR code, and "Erkin GÜLER" Signature.

### [MODIFY] Orchestrator
#### `FullFormalReport.jsx`
- Acts as the data fetcher and state manager.
- Passes `auditData`, `t` (translations), and `metadata` to child components.
- Orchestrates the final render order.

## Verification Plan

### Automated Tests
- Check for duplicate IDs or missing Lucide-React imports in each new file.
- Verify that `pageNum` sequences remain continuous.

### Manual Verification
- Visual check of the Cover Page to ensure it remains in the "Harika" state.
- Ensure the Signature image loads correctly in the new `LastPage` component.
- Confirm QR code data remains intact (3-line format).
- Use `CTRL+P` to verify print layout breaks are still correctly applied.
