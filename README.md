# ampv.github.io
Trial
CargoFlow - Logistics Scheduling Frontend

This repository hosts the front-end code for the CargoFlow delivery and logistics scheduling system. This is a multi-page web application designed to guide users through the process of scheduling a shipment, selecting a delivery option, and viewing confirmation details.

Features

Multi-Step Form: Guides the user from initial shipment details to final confirmation.

Data Persistence: Uses HTML5 LocalStorage and JSON serialization for state management between pages.

Dynamic Pricing: Calculates total cost based on base fare, surcharges, and the selected delivery option.

Responsive Design: Styled using a custom CSS file to ensure a clean, professional look and feel on all devices.

File Structure

| File | Description |
| index.html | The homepage, with a button to start a new delivery. |
| schedule-initial.html | Step 1: Form for entering pickup/delivery details, weight, and dimensions. |
| delivery-options.html | Step 2: Allows users to select speed/price tiers and enter recipient details. |
| confirmation.html | Step 3: Displays the final booking summary and simulated driver details. |
| script.js | Contains all JavaScript logic for data saving/loading and price calculation. |
| style.css | Custom CSS for the CargoFlow branding and layout. |

Deployment via GitHub Pages

This project is configured for easy deployment via GitHub Pages.

Push all files to your main branch (main or master).

Go to your repository settings on GitHub.

Navigate to "Pages".

Set "Source" to deploy from the main branch (or master) and select the /(root) folder.

Save the settings. Your site should be live at https://[your-username].github.io/[your-repo-name]/ shortly.
