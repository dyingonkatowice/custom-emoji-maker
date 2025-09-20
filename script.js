        // Global variables
        let currentStep = 1;
        let currentEmoji = {
            skin: 'light',
            eyes: 'normal',
            nose: 'normal',
            mouth: 'neutral',
        };

        const skinColors = {
            'pink': '#FFB6C1',
            'yellow': '#FFFF99',
            'orange': '#FFA500',
            'green': '#90EE90',
            'blue': '#87CEEB',
            'purple': '#DDA0DD'
        };

        const stepTitles = [
            '', 'Choose Skin Tone', 'Choose Eyes',
            'Choose Nose', 'Choose Mouth', 'Finish'
        ];

        function getEyesHTML(type) {
            switch (type) {
                case 'closed':
                    return `
                        <div style="width: 30px; height: 5px; background: #333; border-radius: 3px;"></div>
                        <div style="width: 30px; height: 5px; background: #333; border-radius: 3px;"></div>
                    `;
                case 'wink':
                    return `
                        <div style="width: 28px; height: 28px; background: #333; border-radius: 50%;"></div>
                        <div style="width: 30px; height: 5px; background: #333; border-radius: 3px;"></div>
                    `;
                case 'wide':
                    return `
                        <div style="width: 36px; height: 36px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 12px; height: 12px; background: #333; border-radius: 50%; position: absolute; top: 10px; left: 10px;"></div>
                        </div>
                        <div style="width: 36px; height: 36px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 12px; height: 12px; background: #333; border-radius: 50%; position: absolute; top: 10px; left: 10px;"></div>
                        </div>
                    `;
                case 'heart':
                    return `
                        <div style="color: #ff69b4; font-size: 28px;">♥</div>
                        <div style="color: #ff69b4; font-size: 28px;">♥</div>
                    `;
                case 'sleepy':
                    return `
                        <div style="width: 28px; height: 28px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 18px; height: 4px; background: #333; border-radius: 2px; position: absolute; top: 18px; left: 4px; transform: rotate(-15deg);"></div>
                        </div>
                        <div style="width: 28px; height: 28px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 18px; height: 4px; background: #333; border-radius: 2px; position: absolute; top: 18px; left: 4px; transform: rotate(15deg);"></div>
                        </div>
                    `;
                case 'surprised':
                    return `
                        <div style="width: 38px; height: 38px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 14px; height: 14px; background: #333; border-radius: 50%; position: absolute; top: 10px; left: 10px;"></div>
                        </div>
                        <div style="width: 38px; height: 38px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 14px; height: 14px; background: #333; border-radius: 50%; position: absolute; top: 10px; left: 10px;"></div>
                        </div>
                    `;
                case 'angry':
                    return `
                        <div style="width: 28px; height: 28px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 20px; height: 4px; background: #333; border-radius: 2px; position: absolute; top: 6px; left: 3px; transform: rotate(-20deg);"></div>
                        </div>
                        <div style="width: 28px; height: 28px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 20px; height: 4px; background: #333; border-radius: 2px; position: absolute; top: 6px; left: 3px; transform: rotate(20deg);"></div>
                        </div>
                    `;
                default: // 'normal'
                    return `
                        <div style="width: 28px; height: 28px; background: #333; border-radius: 50%;"></div>
                        <div style="width: 28px; height: 28px; background: #333; border-radius: 50%;"></div>
                    `;
            }
        }

        function getNoseHTML(type) {
            switch (type) {
                case 'small':
                    return '<div style="width: 8px; height: 8px; background: #333; border-radius: 50%;"></div>';
                case 'big':
                    return '<div style="width: 16px; height: 16px; background: #333; border-radius: 50%;"></div>';
                default:
                    return '<div style="width: 12px; height: 12px; background: #333; border-radius: 50%;"></div>';
            }
        }

        function getMouthHTML(type) {
            switch (type) {
                case 'smile':
                    return '<div style="width: 50px; height: 25px; border: 3px solid #333; border-top: none; border-radius: 0 0 50px 50px;"></div>';
                case 'frown':
                    return '<div style="width: 50px; height: 25px; border: 3px solid #333; border-bottom: none; border-radius: 50px 50px 0 0;"></div>';
                case 'open':
                    return '<div style="width: 22px; height: 25px; background: #333; border-radius: 50%;"></div>';
                case 'kiss':
                    return '<div style="width: 20px; height: 18px; background: #ff69b4; border-radius: 50%; transform: scale(1, 0.8);"></div>';
                case 'tongue':
                    return '<div style="width: 25px; height: 20px; background: #ff69b4; border-radius: 50%; position: relative;"><div style="width: 12px; height: 15px; background: #ff69b4; border-radius: 50%; position: absolute; top: 12px; left: 6px;"></div></div>';
                case 'teeth':
                    return '<div style="width: 45px; height: 20px; border: 3px solid #333; border-top: none; border-radius: 0 0 22px 22px; background: white; position: relative;"><div style="width: 36px; height: 3px; background: #333; position: absolute; top: 8px; left: 4px;"></div></div>';
                case 'laugh':
                    return '<div style="width: 55px; height: 28px; border: 3px solid #333; border-top: none; border-radius: 0 0 55px 55px;"></div>';
                default: // 'neutral'
                    return '<div style="width: 35px; height: 4px; background: #333; border-radius: 3px;"></div>';
            }
        }

        // UI update functions
        function updateSelection(stepId, selectedElement) {
            document.querySelectorAll(`#${stepId} .feature-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked option
            if (selectedElement) { // Ensure selectedElement is not null
                selectedElement.classList.add('selected');
            }
        }

        // Refactored function to render an emoji into a given target element
        function renderEmoji(targetElement, emoji, scale = 1) {
            targetElement.innerHTML = ''; // Clear previous content
            targetElement.style.backgroundColor = skinColors[emoji.skin];
            targetElement.style.position = 'relative'; // Ensure positioning context for absolute children
            targetElement.style.overflow = 'hidden'; // Hide parts outside the face circle

            const applyTransform = (el) => {
                el.style.transform = `translateX(-50%) scale(${scale})`;
                el.style.transformOrigin = 'top center';
            };
            // Add eyebrows
            const eyebrows = document.createElement('div');
            eyebrows.style.cssText = `
                position: absolute;
                top: 60px;
                left: 50%;
                display: flex;
                gap: 50px;
                z-index: 2;
            `;
            applyTransform(eyebrows);
            eyebrows.innerHTML = `
                <div style="width: 28px; height: 5px; background: #333; border-radius: 3px;"></div>
                <div style="width: 28px; height: 5px; background: #333; border-radius: 3px;"></div>
            `;
            targetElement.appendChild(eyebrows);

            // Add eyes
            if (emoji.eyes !== 'none') {
                const eyesContainer = document.createElement('div');
                eyesContainer.style.cssText = `
                    position: absolute;
                    top: 95px;
                    left: 50%;
                    display: flex;
                    gap: 50px;
                    z-index: 2;
                `;
                applyTransform(eyesContainer);
                eyesContainer.innerHTML = getEyesHTML(emoji.eyes);
                targetElement.appendChild(eyesContainer);
            }

            // Add nose
            if (emoji.nose !== 'none') {
                const nose = document.createElement('div');
                nose.style.cssText = `
                    position: absolute;
                    top: 130px;
                    left: 50%;
                    z-index: 2;
                `;
                applyTransform(nose);
                nose.innerHTML = getNoseHTML(emoji.nose);
                targetElement.appendChild(nose);
            }

            // Add mouth
            const mouth = document.createElement('div');
            mouth.style.cssText = `
                position: absolute;
                top: 165px;
                left: 50%;
                z-index: 2;
            `;
            applyTransform(mouth);
            mouth.innerHTML = getMouthHTML(emoji.mouth);
            targetElement.appendChild(mouth);
        }

        function updateEmojiDisplay() {
            const face = document.getElementById('emojiface');
            if (face) {
                renderEmoji(face, currentEmoji);
            }
        }

        function updateStepDisplay() {
            // Update step info
            const stepNumberElement = document.getElementById('stepNumber');
            const stepTitleElement = document.getElementById('stepTitle');

            if (stepNumberElement) stepNumberElement.textContent = `Step ${currentStep} of 5`; // Total steps changed from 7 to 5
            if (stepTitleElement) stepTitleElement.textContent = stepTitles[currentStep];

            // Hide all sections
            document.querySelectorAll('.feature-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show current section
            const stepNames = ['', 'skin', 'eyes', 'nose', 'mouth', 'finish']; // 'hair' removed
            const currentSection = document.getElementById(`step-${stepNames[currentStep]}`);
            if (currentSection) {
                currentSection.classList.add('active');
            }

            // Update navigation buttons
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) prevBtn.disabled = currentStep === 1;
            if (nextBtn) nextBtn.disabled = currentStep === 5; // Total steps changed from 7 to 5

            if (nextBtn) {
                if (currentStep === 5) { // Total steps changed from 7 to 5
                    nextBtn.textContent = 'Finished!';
                } else {
                    nextBtn.textContent = 'Next →';
                }
            }
        }


        // Function to update all visual selections based on currentEmoji state
        function updateAllSelections() {
            // Helper to find and select an option
            const selectOption = (stepId, attributeName, value) => {
                // Simplified selector: now 'none' is just another value for the attribute
                const selector = `#${stepId} .feature-option[${attributeName}="${value}"]`;
                const optionElement = document.querySelector(selector);
                if (optionElement) {
                    updateSelection(stepId, optionElement);
                } else {
                    // If no specific option found, ensure all are deselected for this step
                    document.querySelectorAll(`#${stepId} .feature-option`).forEach(opt => opt.classList.remove('selected'));
                }
            };

            // Select Skin
            selectOption('step-skin', 'data-skin', currentEmoji.skin);

            // Select Hair - Removed

            // Select Eyes
            selectOption('step-eyes', 'data-type', currentEmoji.eyes);

            // Select Nose
            selectOption('step-nose', 'data-type', currentEmoji.nose);

            // Select Mouth
            selectOption('step-mouth', 'data-type', currentEmoji.mouth);
        }


        // Main interaction functions - exposed globally for HTML onclick attributes
        // Note: 'event' is implicitly available in global scope for inline onclick handlers.
        // For stricter environments, 'event' should be passed as an argument from HTML: onclick="selectSkin('light', event)"
        window.selectSkin = function(skin, event) {
            currentEmoji.skin = skin;
            updateSelection('step-skin', event.currentTarget);
            updateEmojiDisplay();
            setTimeout(() => nextStep(), 500);
        };

        // window.selectHair function removed

        window.selectEyes = function(type, event) {
            currentEmoji.eyes = type;
            updateSelection('step-eyes', event.currentTarget);
            updateEmojiDisplay();
            setTimeout(() => nextStep(), 500);
        };

        window.selectNose = function(type, event) {
            currentEmoji.nose = type;
            updateSelection('step-nose', event.currentTarget);
            updateEmojiDisplay();
            setTimeout(() => nextStep(), 500);
        };

        window.selectMouth = function(type, event) {
            currentEmoji.mouth = type;
            updateSelection('step-mouth', event.currentTarget);
            updateEmojiDisplay();
            setTimeout(() => nextStep(), 500);
        };

        window.nextStep = function() {
            if (currentStep < 5) { // Max step changed from 7 to 5
                currentStep++;
                updateStepDisplay();
            }
        };

        window.previousStep = function() {
            if (currentStep > 1) {
                currentStep--;
                updateStepDisplay();
            }
        };

        window.randomizeEmoji = function() {
            // Random skin
            const skins = Object.keys(skinColors);
            currentEmoji.skin = skins[Math.floor(Math.random() * skins.length)];

            // Random hair removed

            // Random eyes
            const eyeTypes = ['normal', 'closed', 'wink', 'wide', 'heart', 'sleepy', 'surprised', 'angry'];
            currentEmoji.eyes = eyeTypes[Math.floor(Math.random() * eyeTypes.length)];

            // Random nose
            const noseTypes = ['none', 'small', 'normal', 'big'];
            currentEmoji.nose = noseTypes[Math.floor(Math.random() * noseTypes.length)];

            // Random mouth
            const mouthTypes = ['neutral', 'smile', 'frown', 'open', 'kiss', 'tongue', 'teeth', 'laugh'];
            currentEmoji.mouth = mouthTypes[Math.floor(Math.random() * mouthTypes.length)];

            updateEmojiDisplay();
            updateAllSelections(); // Now this function actually updates the UI selections
        };

        window.resetEmoji = function() {
            currentStep = 1;
            currentEmoji = {
                skin: 'pink',
                // hair: 'brown', // Default hair color removed
                eyes: 'normal',
                nose: 'normal',
                mouth: 'neutral',
            };

            updateStepDisplay();
            updateEmojiDisplay();
            updateAllSelections(); // Clear all selections visually
        };


        // Initialize the app when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            updateStepDisplay();
            updateEmojiDisplay();
            updateAllSelections(); // Initial selection update
        });
