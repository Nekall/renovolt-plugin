const injectBaseStyles = () => {
  const styleId = "renovolt-styles";
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
            :root {
              --accent: #FD6671;
              --background: #191919;
              --foreground: #F6F6F6;
              --primary-background: #242424;
              --primary-header: #363636;
              --secondary-background: #1E1E1E;
              --secondary-foreground: #C8C8C8;
              --secondary-header: #2D2D2D;
              --tertiary-background: #4D4D4D;
              --tertiary-foreground: #848484;
              --block: #2D2D2D;
              --message-box: #363636;
              --mention: rgba(251, 255, 0, 0.1);
              --scrollbar-thumb: #CA525A;
              --scrollbar-track: transparent;
              --status-online: #3ABF7E;
              --status-away: #F39F00;
              --status-busy: #F84848;
              --status-streaming: #977EFF;
              --status-invisible: #A5A5A5;
              --success: #65E572;
              --warning: #FAA352;
              --error: #ED4245;
              --hover: rgba(0, 0, 0, 0.1);
            }
            
            /* === PROFILE FRAMES === */
            
            /* Neon Blue Frame */
            .renovolt-frame-neon-blue {
              border: 2px solid #00aaff !important;
              box-shadow: 
                0 0 10px #00aaff, 
                inset 0 0 10px rgba(0, 170, 255, 0.1) !important;
              border-radius: 8px !important;
              animation: pulse-blue 2s infinite ease-in-out !important;
            }
            
            @keyframes pulse-blue {
              0%, 100% { box-shadow: 0 0 10px #00aaff, inset 0 0 10px rgba(0, 170, 255, 0.1); }
              50% { box-shadow: 0 0 20px #00aaff, inset 0 0 15px rgba(0, 170, 255, 0.2); }
            }
            
            /* Minimalist frame */
            .renovolt-frame-minimal {
              border: 1px solid rgba(255, 255, 255, 0.2) !important;
              border-radius: 4px !important;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
              transition: all 0.3s ease !important;
            }
            
            .renovolt-frame-minimal:hover {
              border-color: rgba(255, 255, 255, 0.4) !important;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
            }
            
            /* === BACKGROUNDS PROFILE === */
            
            .renovolt-bg-gradient {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            }
            
            .renovolt-bg-cyberpunk {
              background: linear-gradient(45deg, #0f3460, #e94560) !important;
              position: relative !important;
            }
            
            .renovolt-bg-cyberpunk::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: 
                radial-gradient(circle at 25% 25%, #ff006e 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, #8338ec 0%, transparent 50%);
              opacity: 0.3;
              animation: cyberpunk-pulse 4s ease-in-out infinite;
            }
            
            @keyframes cyberpunk-pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.6; }
            }
            
            /* === CUSTOMIZED BADGES === */
            
            .renovolt-badge {
              display: inline-block;
              padding: 2px 6px;
              border-radius: 12px;
              font-size: 10px;
              font-weight: bold;
              margin: 2px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .renovolt-badge-dev {
              background: linear-gradient(45deg, #00d4aa, #00a8cc);
              color: white;
              box-shadow: 0 2px 4px rgba(0, 212, 170, 0.3);
            }
            
            .renovolt-badge-artist {
              background: linear-gradient(45deg, #ff6b6b, #ee5a52);
              color: white;
              box-shadow: 0 2px 4px rgba(255, 107, 107, 0.3);
            }
            
            .renovolt-badge-gamer {
              background: linear-gradient(45deg, #4ecdc4, #44a08d);
              color: white;
              box-shadow: 0 2px 4px rgba(78, 205, 196, 0.3);
            }
            
            /* === RENOVOLT CONFIG PANEL === */
            
            .renovolt-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.85);
              z-index: 9998;
            }
            
            .renovolt-panel {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: var(--primary-background);
              border-radius: 12px;
              width: 750px;
              max-height: 85vh;
              overflow: hidden;
              z-index: 9999;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
              color: var(--foreground);
              font-family: 'Segoe UI', system-ui, sans-serif;
              border: 1px solid var(--secondary-background);
            }

            .panel-header {
              padding: 20px 24px;
              border-bottom: 1px solid var(--secondary-background);
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: var(--primary-header);
            }

            .panel-header h2 {
              color: var(--foreground);
              font-size: 22px;
              font-weight: 600;
              margin: 0;
            }

            .close-btn {
              background: none;
              border: none;
              color: var(--secondary-foreground);
              font-size: 28px;
              cursor: pointer;
              padding: 8px;
              border-radius: 6px;
              transition: all 0.2s ease;
              line-height: 1;
            }

            .close-btn:hover {
              background-color: var(--hover);
              color: var(--accent);
              transform: scale(1.1);
            }

            .panel-content {
              padding: 24px;
              max-height: 65vh;
              overflow-y: auto;
            }

            .panel-content::-webkit-scrollbar {
              width: 8px;
            }

            .panel-content::-webkit-scrollbar-track {
              background: var(--scrollbar-track);
            }

            .panel-content::-webkit-scrollbar-thumb {
              background: var(--scrollbar-thumb);
              border-radius: 4px;
            }

            .avatar-preview-section {
              display: flex;
              align-items: center;
              gap: 24px;
              margin-bottom: 32px;
              padding: 24px;
              background: var(--secondary-background);
              border-radius: 12px;
              border: 1px solid var(--tertiary-background);
            }

            .avatar-preview {
              position: relative;
              width: 120px;
              height: 120px;
            }

            .avatar-img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background: linear-gradient(45deg, var(--accent), #764ba2);
              position: relative;
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }

            .avatar-img::before {
              content: '👤';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 48px;
              color: rgba(255, 255, 255, 0.8);
            }

            .decoration-overlay {
              position: absolute;
              top: -10px;
              left: -10px;
              right: -10px;
              bottom: -10px;
              border-radius: 50%;
              pointer-events: none;
            }

            .decoration-overlay.neon-blue {
              border: 2px solid #00aaff;
              box-shadow: 0 0 20px #00aaff;
              animation: pulse-blue 2s infinite;
            }

            .mini-avatars {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }

            .mini-avatar {
              position: relative;
              width: 45px;
              height: 45px;
            }

            .mini-avatar-img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              background: linear-gradient(45deg, var(--accent), #764ba2);
              position: relative;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .mini-avatar-img::before {
              content: '👤';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 18px;
              color: rgba(255, 255, 255, 0.8);
            }

            .online-indicator {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 14px;
              height: 14px;
              background: var(--status-online);
              border: 3px solid var(--primary-background);
              border-radius: 50%;
            }

            .decorations-section h3,
            .exclusive-section h3,
            .shop-section h3,
            .animated-section h3 {
              color: var(--foreground);
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 20px 0;
              padding-bottom: 8px;
              border-bottom: 2px solid var(--accent);
              display: inline-block;
            }

            .decorations-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
              gap: 16px;
              margin-bottom: 32px;
            }

            .decoration-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
              cursor: pointer;
              padding: 12px;
              border-radius: 10px;
              transition: all 0.3s ease;
              position: relative;
              background: var(--tertiary-background);
              border: 2px solid transparent;
            }

            .decoration-item:hover {
              background-color: var(--secondary-header);
              transform: translateY(-2px);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }

            .decoration-item.active {
              background-color: var(--accent);
              border-color: var(--accent);
              color: white;
            }

            .decoration-item.active .decoration-label {
              color: white;
            }

            .decoration-preview {
              width: 70px;
              height: 70px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .decoration-preview.none {
              background: var(--secondary-background);
              border: 2px dashed var(--tertiary-foreground);
            }

            .no-decoration-icon {
              font-size: 28px;
              color: var(--tertiary-foreground);
            }

            .decoration-preview.neon-blue {
              background: radial-gradient(circle, #00aaff 0%, transparent 70%);
              border: 2px solid #00aaff;
              box-shadow: 0 0 20px #00aaff;
              animation: pulse-blue 2s infinite;
            }

            .decoration-preview.fire-ring .fire-effect {
              width: 100%;
              height: 100%;
              background: conic-gradient(from 0deg, #ff4500, #ff8c00, #ffd700, #ff4500);
              border-radius: 50%;
              animation: rotate 2s linear infinite;
            }

            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .decoration-preview.cyberpunk {
              background: linear-gradient(45deg, #0f3460, #e94560);
              border: 2px solid #ff006e;
              box-shadow: 0 0 20px #ff006e;
            }

            .decoration-preview.minimal {
              border: 2px solid rgba(255, 255, 255, 0.3);
              background: rgba(255, 255, 255, 0.05);
            }

            .decoration-preview.galaxy {
              background: radial-gradient(ellipse at center, #4b0082 0%, #000080 50%, #000000 100%);
              border: 2px solid #9370db;
              position: relative;
            }

            .decoration-preview.galaxy::before {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background: 
                radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
                radial-gradient(2px 2px at 40px 70px, #ffffff, transparent),
                radial-gradient(1px 1px at 90% 40%, #ffffff, transparent);
              border-radius: 50%;
              animation: twinkle 3s ease-in-out infinite alternate;
            }

            @keyframes twinkle {
              0% { opacity: 0.3; }
              100% { opacity: 1; }
            }

            /* Collection 1 */
            .decoration-preview.premium-rainbow {
              background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
              background-size: 300% 300%;
              animation: gradient-shift 3s ease infinite;
              border: 2px solid #feca57;
            }

            .decoration-preview.premium-holographic {
              background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
              background-size: 400% 400%;
              animation: holographic 4s ease-in-out infinite;
              border: 2px solid #667eea;
            }

            .decoration-preview.premium-plasma {
              background: radial-gradient(circle, #ff006e, #8338ec, #3a86ff);
              animation: plasma-pulse 2.5s ease-in-out infinite;
              border: 2px solid #ff006e;
            }

            .decoration-preview.premium-void {
              background: radial-gradient(circle, #000000, #1a1a2e, #16213e);
              border: 2px solid #e94560;
              box-shadow: 0 0 30px #e94560;
              animation: void-pulse 3s ease-in-out infinite;
            }

            /* Collection 2 */
            .decoration-preview.exclusive-diamond {
              background: linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff);
              border: 2px solid #ffffff;
              box-shadow: 0 0 25px #ffffff;
              animation: diamond-sparkle 2s ease-in-out infinite;
            }

            .decoration-preview.exclusive-crystal {
              background: linear-gradient(135deg, #74b9ff, #0984e3, #74b9ff);
              border: 2px solid #74b9ff;
              animation: crystal-glow 3s ease-in-out infinite;
            }

            .decoration-preview.exclusive-aurora {
              background: linear-gradient(45deg, #00b894, #00cec9, #74b9ff, #a29bfe);
              background-size: 400% 400%;
              animation: aurora-flow 4s ease-in-out infinite;
              border: 2px solid #00b894;
            }

            .decoration-preview.exclusive-nebula {
              background: radial-gradient(ellipse, #6c5ce7, #a29bfe, #fd79a8);
              animation: nebula-drift 5s ease-in-out infinite;
              border: 2px solid #6c5ce7;
            }

            /* Animated Collection */
            .decoration-preview.animated-pulse {
              background: var(--accent);
              animation: intense-pulse 1.5s ease-in-out infinite;
              border: 2px solid var(--accent);
            }

            .decoration-preview.animated-orbit {
              background: radial-gradient(circle, #fdcb6e, #e17055);
              border: 2px solid #fdcb6e;
              position: relative;
            }

            .decoration-preview.animated-orbit::after {
              content: '';
              position: absolute;
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
              top: 10%;
              left: 50%;
              transform: translateX(-50%);
              animation: orbit 2s linear infinite;
            }

            .decoration-preview.animated-wave {
              background: linear-gradient(45deg, #74b9ff, #0984e3);
              border: 2px solid #74b9ff;
              animation: wave-motion 2s ease-in-out infinite;
            }

            .decoration-preview.animated-spark {
              background: linear-gradient(45deg, #fdcb6e, #e17055);
              border: 2px solid #fdcb6e;
              position: relative;
              overflow: visible;
            }

            .decoration-preview.animated-spark::before {
              content: '✨';
              position: absolute;
              font-size: 12px;
              animation: spark-dance 1.5s ease-in-out infinite;
            }

            .decoration-label {
              font-size: 12px;
              color: var(--secondary-foreground);
              text-align: center;
              font-weight: 500;
            }

            .panel-footer {
              padding: 20px 24px;
              border-top: 1px solid var(--secondary-background);
              display: flex;
              justify-content: flex-end;
              background: var(--primary-header);
            }

            .cancel-btn {
              background: var(--tertiary-background);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              font-size: 14px;
              margin-right: 10px;
            }

            .cancel-btn:hover {
              background: var(--secondary-foreground);
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(110, 110, 110, 0.3);
            }

            .apply-btn {
              background: var(--accent);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              font-size: 14px;
            }

            .apply-btn:hover {
              background: var(--tertiary-foreground);
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(141, 141, 141, 0.3);
            }

            /* Animations */
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            @keyframes holographic {
              0%, 100% { background-position: 0% 50%; }
              25% { background-position: 100% 0%; }
              50% { background-position: 100% 100%; }
              75% { background-position: 0% 100%; }
            }

            @keyframes plasma-pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }

            @keyframes void-pulse {
              0%, 100% { box-shadow: 0 0 30px #e94560; }
              50% { box-shadow: 0 0 50px #e94560, inset 0 0 20px #e94560; }
            }

            @keyframes diamond-sparkle {
              0%, 100% { box-shadow: 0 0 25px #ffffff; }
              50% { box-shadow: 0 0 40px #ffffff, 0 0 60px #ffffff; }
            }

            @keyframes crystal-glow {
              0%, 100% { transform: scale(1); filter: brightness(1); }
              50% { transform: scale(1.05); filter: brightness(1.2); }
            }

            @keyframes aurora-flow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            @keyframes nebula-drift {
              0%, 100% { transform: rotate(0deg) scale(1); }
              50% { transform: rotate(180deg) scale(1.1); }
            }

            @keyframes intense-pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.8; }
            }

            @keyframes orbit {
              0% { transform: translateX(-50%) rotate(0deg) translateX(30px) rotate(0deg); }
              100% { transform: translateX(-50%) rotate(360deg) translateX(30px) rotate(-360deg); }
            }

            @keyframes wave-motion {
              0%, 100% { border-radius: 50%; }
              25% { border-radius: 60% 40% 30% 70%; }
              50% { border-radius: 30% 60% 70% 40%; }
              75% { border-radius: 40% 30% 60% 50%; }
            }

            @keyframes spark-dance {
              0% { top: 10%; left: 10%; opacity: 1; }
              25% { top: 10%; left: 80%; opacity: 0.8; }
              50% { top: 80%; left: 80%; opacity: 1; }
              75% { top: 80%; left: 10%; opacity: 0.6; }
              100% { top: 10%; left: 10%; opacity: 1; }
            }
            
            /* === RENOVOLT BUTTON === */
            
            #renovolt-button {
              position: fixed;
              bottom: 60px;
              left: 7px;
              width: 42px;
              height: 42px;
              background-color: #1E1E1E;
              border: none;
              cursor: pointer;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background-color 0.2s, transform 0.4s ease;
              padding: 10px;
              z-index: 1000;
            }
            
            #renovolt-button:hover {
              background-color: transparent;
            }
            
            #renovolt-button:hover svg {
              transform: scale(0.9) rotate(-5deg);
            }
            
            #renovolt-button:active svg {
              transform: scale(0.82) rotate(-8deg);
              transition: transform 0.12s ease-out;
            }
            
            #renovolt-button svg {
              transition: transform 0.4s ease;
              transform-origin: center center;
              display: block;
            }
            
            #renovolt-button .formes path {
              fill: white;
              transition: fill 0.6s ease, filter 0.6s ease;
            }
            
            #renovolt-button:hover .formes path.highlight {
              fill: url(#rainbow);
              filter: url(#glow);
            }
            
            /* === FRAME PREVIEWS === */
            
            .frame-preview {
              width: 100px;
              height: 60px;
              margin: 5px;
              cursor: pointer;
              border-radius: 4px;
              display: inline-block;
              position: relative;
              transition: transform 0.2s ease;
            }
            
            .frame-preview:hover {
              transform: scale(1.05);
            }
            
            .frame-preview.active {
              outline: 2px solid var(--accent);
            }
            
            /* === RESPONSIVE DESIGN === */
            
            @media (max-width: 768px) {
              .renovolt-panel {
                width: 95vw;
                max-height: 90vh;
              }
              
              .decorations-grid {
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 12px;
              }
              
              .decoration-preview {
                width: 60px;
                height: 60px;
              }
              
              .avatar-preview-section {
                flex-direction: column;
                text-align: center;
              }
              
              .mini-avatars {
                flex-direction: row;
                justify-content: center;
              }
            }
            
            /* === EFFECTS === */
            
            .premium-grid .decoration-item {
              position: relative;
            }
      `;
  document.head.appendChild(style);
  console.info("ʀᴇɴᴏᴠᴏʟᴛ | " + "Styles injected");
};

const cleanupStyles = () => {
  const styleEl = document.getElementById("renovolt-styles");
  if (styleEl) styleEl.remove();
};
