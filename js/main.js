/**
 * QuickTools India Main JavaScript
 * Handles Persistence (Auto-Save) and Social Sharing
 */

// Auto-Save Functionality
function initAutoSave(pagePrefix) {
    if (!pagePrefix) {
        console.warn('initAutoSave: No pagePrefix provided');
        return;
    }

    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), select');

    // Load saved values
    inputs.forEach(input => {
        if (!input.id) return; // Skip inputs without ID

        const key = `${pagePrefix}_${input.id}`;
        const savedValue = localStorage.getItem(key);

        if (savedValue !== null) {
            // Handle checkboxes specifically if needed, though most here are numbers/text
            if (input.type === 'checkbox') {
                input.checked = (savedValue === 'true');
            } else {
                input.value = savedValue;
            }

            // Trigger input event so charts/calcs update
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Save on interaction
        const saveHandler = (e) => {
            const val = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
            localStorage.setItem(key, val);
        };

        input.addEventListener('input', saveHandler);
        input.addEventListener('change', saveHandler);
    });
}

// Reset Form Functionality
function resetForm(pagePrefix) {
    if (!confirm('Are you sure you want to reset all fields? This will clear your saved data.')) {
        return;
    }

    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), select');

    inputs.forEach(input => {
        if (!input.id) return;

        // Clear local storage
        const key = `${pagePrefix}_${input.id}`;
        localStorage.removeItem(key);

        // Reset to default value
        if (input.type === 'checkbox') {
            input.checked = input.defaultChecked;
        } else {
            // Use defaultValue if available, otherwise try some sensible defaults or empty
            input.value = input.defaultValue;
        }

        // Trigger events to update UI/Charts
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Optional: Reload page to ensure clean state if needed, but dispatchEvent should suffice for most
    // location.reload();
}

// WhatsApp Share Functionality
function shareResult(title, amountString) {
    const text = `I just calculated my ${title} on QuickTools India! Result: ${amountString}. Check it out here:`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)} ${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}
