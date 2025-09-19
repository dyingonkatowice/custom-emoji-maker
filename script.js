        // Global variables
        let currentStep = 1;
        let currentEmoji = {
            skin: 'light',
            hair: { type: 'none', color: 'brown' },
            eyes: 'normal',
            nose: 'normal',
            mouth: 'neutral',
            accessories: 'none'
        };
        let savedEmojis = [];

        const skinColors = {
            'light': '#FDBCB4',
            'medium-light': '#F1C27D',
            'medium': '#E0AC69',
            'medium-dark': '#C68642',
            'dark': '#8D5524',
            'very-dark': '#6D4C41'
        };

        const hairColors = {
            'brown': '#8B4513',
            'blonde': '#DAA520',
            'black': '#000000',
            'red': '#B22222',
            'gray': '#808080',
            'white': '#F5F5F5',
            'auburn': '#A52A2A',
            'pink': '#FF69B4',
            'blue': '#4169E1',
            'green': '#32CD32'
        };

        const stepTitles = [
            '', 'Choose Skin Tone', 'Choose Hair', 'Choose Eyes',
            'Choose Nose', 'Choose Mouth', 'Choose Accessories', 'Finish'
        ];

        // Helper functions for rendering emoji parts
        function getHairBorderRadius(type) {
            switch (type) {
                case 'short': return '100px 100px 20px 20px';
                case 'long': return '100px 100px 40px 40px';
                case 'curly': return '60% 40% 60% 40%';
                case 'spiky': return '50% 50% 0% 0%';
                case 'afro': return '80% 80% 60% 60%';
                case 'ponytail': return '100px 100px 30px 30px';
                default: return '100px 100px 20px 20px';
            }
        }

        function getHairHTML(type, color) {
            const colorValue = hairColors[color];
            
            switch (type) {
                case 'short':
                    return `<div style="width: 100%; height: 100%; background: ${colorValue}; border-radius: 50% 50% 20% 20%;"></div>`;
                
                case 'long':
                    return `<div style="width: 100%; height: 100%; background: ${colorValue}; border-radius: 50% 50% 30% 30%;"></div>`;
                
                case 'curly':
                    return `
                        <div style="width: 100%; height: 100%; background: ${colorValue}; border-radius: 60% 40% 60% 40%; position: relative;">
                            <div style="width: 20px; height: 20px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 10px; left: 20px;"></div>
                            <div style="width: 18px; height: 18px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 15px; left: 50px;"></div>
                            <div style="width: 22px; height: 22px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 8px; left: 80px;"></div>
                            <div style="width: 16px; height: 16px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 12px; left: 110px;"></div>
                            <div style="width: 20px; height: 20px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 6px; left: 140px;"></div>
                            <div style="width: 18px; height: 18px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 14px; left: 170px;"></div>
                            <div style="width: 21px; height: 21px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 9px; left: 200px;"></div>
                        </div>
                    `;
                
                case 'spiky':
                    return `
                        <div style="width: 100%; height: 100%; background: ${colorValue}; border-radius: 50% 50% 0% 0%; position: relative;">
                            <div style="width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-bottom: 25px solid ${colorValue}; position: absolute; top: 0; left: 30px;"></div>
                            <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-bottom: 20px solid ${colorValue}; position: absolute; top: 0; left: 60px;"></div>
                            <div style="width: 0; height: 0; border-left: 18px solid transparent; border-right: 18px solid transparent; border-bottom: 28px solid ${colorValue}; position: absolute; top: 0; left: 90px;"></div>
                            <div style="width: 0; height: 0; border-left: 14px solid transparent; border-right: 14px solid transparent; border-bottom: 22px solid ${colorValue}; position: absolute; top: 0; left: 120px;"></div>
                            <div style="width: 0; height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent; border-bottom: 24px solid ${colorValue}; position: absolute; top: 0; left: 150px;"></div>
                            <div style="width: 0; height: 0; border-left: 13px solid transparent; border-right: 13px solid transparent; border-bottom: 21px solid ${colorValue}; position: absolute; top: 0; left: 180px;"></div>
                        </div>
                    `;
                
                case 'afro':
                    return `
                        <div style="width: 100%; height: 100%; background: ${colorValue}; border-radius: 80% 80% 60% 60%; position: relative;">
                            <div style="width: 25px; height: 25px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 5px; left: 15px;"></div>
                            <div style="width: 30px; height: 30px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 8px; left: 45px;"></div>
                            <div style="width: 28px; height: 28px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 3px; left: 80px;"></div>
                            <div style="width: 32px; height: 32px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 6px; left: 115px;"></div>
                            <div style="width: 26px; height: 26px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 4px; left: 150px;"></div>
                            <div style="width: 29px; height: 29px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 7px; left: 185px;"></div>
                        </div>
                    `;
                
                case 'ponytail':
                    return `
                        <div style="width: 100%; height: 100%; background: ${colorValue}; border-radius: 100px 100px 30px 30px; position: relative;">
                            <div style="width: 15px; height: 60px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 20px; left: 120px; transform: rotate(15deg);"></div>
                            <div style="width: 12px; height: 50px; background: ${colorValue}; border-radius: 50%; position: absolute; top: 25px; left: 140px; transform: rotate(25deg);"></div>
                        </div>
                    `;
                
                default:
                    return `<div style="width: 100%; height: 100%; background: ${colorValue}; border-radius: 50% 50% 20% 20%;"></div>`;
            }
        }

        function getEyesHTML(type) {
            switch (type) {
                case 'closed':
                    return `
                        <div style="width: 30px; height: 4px; background: #333; border-radius: 2px;"></div>
                        <div style="width: 30px; height: 4px; background: #333; border-radius: 2px;"></div>
                    `;
                case 'wink':
                    return `
                        <div style="width: 25px; height: 25px; background: #333; border-radius: 50%;"></div>
                        <div style="width: 30px; height: 4px; background: #333; border-radius: 2px;"></div>
                    `;
                case 'wide':
                    return `
                        <div style="width: 35px; height: 35px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 12px; height: 12px; background: #333; border-radius: 50%; position: absolute; top: 8px; left: 8px;"></div>
                        </div>
                        <div style="width: 35px; height: 35px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 12px; height: 12px; background: #333; border-radius: 50%; position: absolute; top: 8px; left: 8px;"></div>
                        </div>
                    `;
                case 'heart':
                    return `
                        <div style="color: #ff69b4; font-size: 25px;">♥</div>
                        <div style="color: #ff69b4; font-size: 25px;">♥</div>
                    `;
                case 'sleepy':
                    return `
                        <div style="width: 25px; height: 25px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 18px; height: 2px; background: #333; border-radius: 1px; position: absolute; top: 15px; left: 3px; transform: rotate(-15deg);"></div>
                        </div>
                        <div style="width: 25px; height: 25px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 18px; height: 2px; background: #333; border-radius: 1px; position: absolute; top: 15px; left: 3px; transform: rotate(15deg);"></div>
                        </div>
                    `;
                case 'surprised':
                    return `
                        <div style="width: 40px; height: 40px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 15px; height: 15px; background: #333; border-radius: 50%; position: absolute; top: 10px; left: 10px;"></div>
                        </div>
                        <div style="width: 40px; height: 40px; border: 3px solid #333; border-radius: 50%; background: white; position: relative;">
                            <div style="width: 15px; height: 15px; background: #333; border-radius: 50%; position: absolute; top: 10px; left: 10px;"></div>
                        </div>
                    `;
                case 'angry':
                    return `
                        <div style="width: 25px; height: 25px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 20px; height: 3px; background: #333; border-radius: 1px; position: absolute; top: 6px; left: 2px; transform: rotate(-20deg);"></div>
                        </div>
                        <div style="width: 25px; height: 25px; background: #333; border-radius: 50%; position: relative;">
                            <div style="width: 20px; height: 3px; background: #333; border-radius: 1px; position: absolute; top: 6px; left: 2px; transform: rotate(20deg);"></div>
                        </div>
                    `;
                default: // 'normal'
                    return `
                        <div style="width: 25px; height: 25px; background: #333; border-radius: 50%;"></div>
                        <div style="width: 25px; height: 25px; background: #333; border-radius: 50%;"></div>
                    `;
            }
        }

        function getNoseHTML(type) {
            switch (type) {
                case 'small':
                    return '<div style="width: 6px; height: 6px; background: #333; border-radius: 50%;"></div>';
                case 'big':
                    return '<div style="width: 12px; height: 12px; background: #333; border-radius: 50%;"></div>';
                default: // 'normal'
                    return '<div style="width: 8px; height: 8px; background: #333; border-radius: 50%;"></div>';
            }
        }

        function getMouthHTML(type) {
            switch (type) {
                case 'smile':
                    return '<div style="width: 50px; height: 25px; border: 3px solid #333; border-top: none; border-radius: 0 0 50px 50px;"></div>';
                case 'frown':
                    return '<div style="width: 50px; height: 25px; border: 3px solid #333; border-bottom: none; border-radius: 50px 50px 0 0;"></div>';
                case 'open':
                    return '<div style="width: 20px; height: 25px; background: #333; border-radius: 50%;"></div>';
                case 'kiss':
                    return '<div style="width: 18px; height: 15px; background: #ff69b4; border-radius: 50%; transform: scale(1, 0.8);"></div>';
                case 'tongue':
                    return '<div style="width: 25px; height: 20px; background: #ff69b4; border-radius: 50%; position: relative;"><div style="width: 10px; height: 12px; background: #ff69b4; border-radius: 50%; position: absolute; top: 10px; left: 7px;"></div></div>';
                case 'teeth':
                    return '<div style="width: 40px; height: 18px; border: 3px solid #333; border-top: none; border-radius: 0 0 20px 20px; background: white; position: relative;"><div style="width: 32px; height: 2px; background: #333; position: absolute; top: 6px; left: 4px;"></div></div>';
                case 'laugh':
                    return '<div style="width: 55px; height: 28px; border: 3px solid #333; border-top: none; border-radius: 0 0 55px 55px;"></div>';
                default: // 'neutral'
                    return '<div style="width: 35px; height: 3px; background: #333; border-radius: 2px;"></div>';
            }
        }

        function getAccessoryHTML(type) {
            switch (type) {
                case 'glasses':
                    return `
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <div style="width: 40px; height: 40px; border: 3px solid #333; border-radius: 50%;"></div>
                            <div style="width: 15px; height: 3px; background: #333;"></div>
                            <div style="width: 40px; height: 40px; border: 3px solid #333; border-radius: 50%;"></div>
                        </div>
                    `;
                case 'sunglasses':
                    return `
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <div style="width: 40px; height: 40px; background: #333; border-radius: 50%;"></div>
                            <div style="width: 15px; height: 3px; background: #333;"></div>
                            <div style="width: 40px; height: 40px; background: #333; border-radius: 50%;"></div>
                        </div>
                    `;
                case 'hat':
                    return '<div style="width: 90px; height: 25px; background: #8B4513; border-radius: 45px 45px 0 0;"></div>';
                case 'crown':
                    return '<div style="width: 100px; height: 25px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50px 50px 0 0; position: relative;"><div style="width: 15px; height: 18px; background: #FFD700; position: absolute; top: -18px; left: 20px; transform: rotate(45deg);"></div><div style="width: 15px; height: 18px; background: #FFD700; position: absolute; top: -18px; left: 42px; transform: rotate(45deg);"></div><div style="width: 15px; height: 18px; background: #FFD700; position: absolute; top: -18px; left: 64px; transform: rotate(45deg);"></div></div>';
                case 'mask':
                    return '<div style="width: 60px; height: 30px; background: #000; border-radius: 30px; position: relative;"><div style="width: 15px; height: 15px; background: #fff; border-radius: 50%; position: absolute; top: 7px; left: 10px;"></div><div style="width: 15px; height: 15px; background: #fff; border-radius: 50%; position: absolute; top: 7px; left: 35px;"></div></div>';
                case 'earrings':
                    return '<div style="display: flex; gap: 80px; align-items: center;"><div style="width: 6px; height: 10px; background: #FFD700; border-radius: 50%;"></div><div style="width: 6px; height: 10px; background: #FFD700; border-radius: 50%;"></div></div>';
                default: // 'none'
                    return '';
            }
        }

        // UI update functions
        function updateSelection(stepId, selectedElement) {
            // Remove selected class from all options in this step
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

            // Add hair
            if (emoji.hair.type !== 'none') {
                const hair = document.createElement('div');
                hair.style.cssText = `
                    position: absolute;
                    top: -25px;
                    left: 50%;
                    width: 240px;
                    height: ${emoji.hair.type === 'long' ? '160px' : '90px'};
                    z-index: 1;
                `;
                applyTransform(hair);
                hair.innerHTML = getHairHTML(emoji.hair.type, emoji.hair.color);
                targetElement.appendChild(hair);
            }

            // Add eyebrows
            const eyebrows = document.createElement('div');
            eyebrows.style.cssText = `
                position: absolute;
                top: 60px;
                left: 50%;
                display: flex;
                gap: 45px;
                z-index: 2;
            `;
            applyTransform(eyebrows);
            eyebrows.innerHTML = `
                <div style="width: 25px; height: 4px; background: #333; border-radius: 2px;"></div>
                <div style="width: 25px; height: 4px; background: #333; border-radius: 2px;"></div>
            `;
            targetElement.appendChild(eyebrows);

            // Add eyes
            if (emoji.eyes !== 'none') {
                const eyesContainer = document.createElement('div');
                eyesContainer.style.cssText = `
                    position: absolute;
                    top: 75px;
                    left: 50%;
                    display: flex;
                    gap: 45px;
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
                    top: 120px;
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
                top: 150px;
                left: 50%;
                z-index: 2;
            `;
            applyTransform(mouth);
            mouth.innerHTML = getMouthHTML(emoji.mouth);
            targetElement.appendChild(mouth);

            // Add accessories
            if (emoji.accessories !== 'none') {
                const accessory = document.createElement('div');
                let topPosition = '60px';
                if (emoji.accessories === 'hat') {
                    topPosition = '-15px';
                } else if (emoji.accessories === 'crown') {
                    topPosition = '-25px';
                } else if (emoji.accessories === 'earrings') {
                    topPosition = '80px';
                }
                
                accessory.style.cssText = `
                    position: absolute;
                    top: ${topPosition};
                    left: 50%;
                    z-index: 3;
                `;
                applyTransform(accessory);
                accessory.innerHTML = getAccessoryHTML(emoji.accessories);
                targetElement.appendChild(accessory);
            }
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

            if (stepNumberElement) stepNumberElement.textContent = `Step ${currentStep} of 7`;
            if (stepTitleElement) stepTitleElement.textContent = stepTitles[currentStep];

            // Hide all sections
            document.querySelectorAll('.feature-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show current section
            const stepNames = ['', 'skin', 'hair', 'eyes', 'nose', 'mouth', 'accessories', 'finish'];
            const currentSection = document.getElementById(`step-${stepNames[currentStep]}`);
            if (currentSection) {
                currentSection.classList.add('active');
            }

            // Update navigation buttons
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) prevBtn.disabled = currentStep === 1;
            if (nextBtn) nextBtn.disabled = currentStep === 7;

            if (nextBtn) {
                if (currentStep === 7) {
                    nextBtn.textContent = 'Finished!';
                } else {
                    nextBtn.textContent = 'Next →';
                }
            }
        }

        function updateSavedGrid() {
            const grid = document.getElementById('savedGrid');

            if (!grid) return; // Ensure grid element exists

            if (savedEmojis.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; color: #666;">No emojis saved yet. Create your first custom emoji!</p>';
                return;
            }

            grid.innerHTML = '';

            savedEmojis.forEach((emoji, index) => {
                const emojiElement = document.createElement('div');
                emojiElement.className = 'saved-emoji';

                const miniEmojiFaceContainer = document.createElement('div');
                miniEmojiFaceContainer.style.cssText = `
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    border: 2px solid #ddd;
                    margin-bottom: 10px;
                    position: relative;
                    overflow: hidden;
                `;
                // Render the full emoji into the miniature container, scaled down
                renderEmoji(miniEmojiFaceContainer, emoji, 0.3); // Scale factor 0.3 for 60x60px container from 200x200px base

                emojiElement.appendChild(miniEmojiFaceContainer);
                const label = document.createElement('div');
                label.style.cssText = 'font-size: 12px; font-weight: bold; color: #666;';
                label.textContent = `Emoji ${index + 1}`;
                emojiElement.appendChild(label);

                emojiElement.onclick = () => {
                    currentEmoji = { ...emoji };
                    updateEmojiDisplay();
                    updateAllSelections(); // Update UI selections when loading a saved emoji
                    // Visual feedback
                    emojiElement.style.background = '#e8f5e8';
                    setTimeout(() => {
                        emojiElement.style.background = 'white';
                    }, 300);
                };

                grid.appendChild(emojiElement);
            });
        }

        // Function to update all visual selections based on currentEmoji state
        function updateAllSelections() {
            // Helper to find and select an option
            const selectOption = (stepId, attributeName, value) => {
                // For 'none' options, assume data-type="none"
                const selector = value === 'none'
                    ? `#${stepId} .feature-option[data-type="none"]`
                    : `#${stepId} .feature-option[${attributeName}="${value}"]`;
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

            // Select Hair
            if (currentEmoji.hair.type === 'none') {
                selectOption('step-hair', 'data-type', 'none');
            } else {
                const hairOption = document.querySelector(`#step-hair .feature-option[data-type="${currentEmoji.hair.type}"][data-color="${currentEmoji.hair.color}"]`);
                if (hairOption) {
                    updateSelection('step-hair', hairOption);
                } else {
                    document.querySelectorAll(`#step-hair .feature-option`).forEach(opt => opt.classList.remove('selected'));
                }
            }

            // Select Eyes
            selectOption('step-eyes', 'data-type', currentEmoji.eyes);

            // Select Nose
            selectOption('step-nose', 'data-type', currentEmoji.nose);

            // Select Mouth
            selectOption('step-mouth', 'data-type', currentEmoji.mouth);

            // Select Accessories
            selectOption('step-accessories', 'data-type', currentEmoji.accessories);
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

        window.selectHair = function(type, color = 'brown', event) {
            currentEmoji.hair = { type, color };
            updateSelection('step-hair', event.currentTarget);
            updateEmojiDisplay();
            setTimeout(() => nextStep(), 500);
        };

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

        window.selectAccessory = function(type, event) {
            currentEmoji.accessories = type;
            updateSelection('step-accessories', event.currentTarget);
            updateEmojiDisplay();
            setTimeout(() => nextStep(), 500);
        };

        window.nextStep = function() {
            if (currentStep < 7) {
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

            // Random hair
            const hairTypes = ['none', 'short', 'long', 'curly', 'spiky', 'afro', 'ponytail'];
            const hairColorKeys = Object.keys(hairColors);
            const randomHairType = hairTypes[Math.floor(Math.random() * hairTypes.length)];
            const randomHairColor = hairColorKeys[Math.floor(Math.random() * hairColorKeys.length)];
            currentEmoji.hair = { type: randomHairType, color: randomHairColor };

            // Random eyes
            const eyeTypes = ['normal', 'closed', 'wink', 'wide', 'heart', 'sleepy', 'surprised', 'angry'];
            currentEmoji.eyes = eyeTypes[Math.floor(Math.random() * eyeTypes.length)];

            // Random nose
            const noseTypes = ['none', 'small', 'normal', 'big'];
            currentEmoji.nose = noseTypes[Math.floor(Math.random() * noseTypes.length)];

            // Random mouth
            const mouthTypes = ['neutral', 'smile', 'frown', 'open', 'kiss', 'tongue', 'teeth', 'laugh'];
            currentEmoji.mouth = mouthTypes[Math.floor(Math.random() * mouthTypes.length)];

            // Random accessories
            const accessoryTypes = ['none', 'glasses', 'sunglasses', 'hat', 'crown', 'mask', 'earrings'];
            currentEmoji.accessories = accessoryTypes[Math.floor(Math.random() * accessoryTypes.length)];

            updateEmojiDisplay();
            updateAllSelections(); // Now this function actually updates the UI selections
        };

        window.resetEmoji = function() {
            currentStep = 1;
            currentEmoji = {
                skin: 'light',
                hair: { type: 'none', color: 'brown' },
                eyes: 'normal',
                nose: 'normal',
                mouth: 'neutral',
                accessories: 'none'
            };

            updateStepDisplay();
            updateEmojiDisplay();
            updateAllSelections(); // Clear all selections visually
        };

        window.saveEmoji = function() {
            const emojiData = { ...currentEmoji };

            // Check if emoji already exists
            const exists = savedEmojis.some(saved =>
                JSON.stringify(saved) === JSON.stringify(emojiData)
            );

            if (!exists) {
                savedEmojis.push(emojiData);
                updateSavedGrid();

                // Show success feedback
                const btn = event.target; // event is implicitly available here
                const originalText = btn.textContent;
                btn.textContent = '✅ Saved!';
                btn.style.background = '#4CAF50';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#4ecdc4';
                }, 1500);
            } else {
                // Show already exists feedback
                const btn = event.target; // event is implicitly available here
                const originalText = btn.textContent;
                btn.textContent = '👍 Already Saved';
                btn.style.background = '#ff9800';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#4ecdc4';
                }, 1500);
            }
        };

        // Initialize the app when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            updateStepDisplay();
            updateEmojiDisplay();
            updateAllSelections(); // Initial selection update
            updateSavedGrid(); // Load/display saved emojis on startup
        });
