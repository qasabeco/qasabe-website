// 1. GLOBAL HELPER FOR BUTTON CLICKS (FIX TONER & OTHER PRODUCT BUTTON INTERACTION)
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// 2. INJECT CHAT INTERFACE & FLOATING BUTTON INTO THE BODY
document.body.insertAdjacentHTML("beforeend", `
<div class="ai-chat-box" id="chatBox">
    <div class="ai-header">
        <div class="ai-header-text">
            <h3>QASABE AI ✨</h3>
            <small>Hi there! 👋 How can I help?</small>
        </div>
        <button class="close-btn" onclick="toggleChat()">✖</button>
    </div>
    
    <div class="ai-body" id="chatBody">
        <div class="ai-message bot">
            Hello! I'm your QASABE AI assistant 💛<br>Ask me about our products, shipping, orders, or recommendations!
        </div>
        
        <div class="quick-wrapper">
            <button class="quick-btn" onclick="quickAsk('Which product is best for sleep?')">🌙 Best for sleep?</button>
            <button class="quick-btn" onclick="quickAsk('Which product is good for skin?')">✨ Best for skin?</button>
            <button class="quick-btn" onclick="quickAsk('Tell me about Energy Snack')">🍪 Energy Snack info</button>
            <button class="quick-btn" onclick="quickAsk('What are the promo packages?')">🎁 Promo & Combos</button>
            <button class="quick-btn" onclick="quickAsk('What are the prices?')">💰 Product prices?</button>
            <button class="quick-btn" onclick="quickAsk('How much is shipping?')">📦 Shipping & COD</button>
            <button class="quick-btn" onclick="quickAsk('How to contact QASABE?')">☎️ Contact us</button>
        </div>
    </div>
    
    <div class="ai-input">
        <input id="aiText" placeholder="Type your message...">
        <button onclick="sendAI()">➤</button>
    </div>
</div>

<div class="ai-float-btn" onclick="toggleChat()">
    <i>✨</i>
    <span>AI Chat</span>
</div>
`);

// 3. SUBMIT ON ENTER KEY
document.getElementById("aiText").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendAI();
    }
});

// 4. TOGGLE CHAT BOX
function toggleChat() {
    let box = document.getElementById("chatBox");
    if (box.classList.contains("show")) {
        box.classList.remove("show");
        setTimeout(() => box.style.display = "none", 300);
    } else {
        box.style.display = "flex";
        setTimeout(() => box.classList.add("show"), 10);
    }
}

// 5. QUICK SUGGESTION BUTTONS
function quickAsk(text) {
    document.getElementById("aiText").value = text;
    sendAI();
}

// 6. SEND MESSAGE & SHOW TYPING ANIMATION
function sendAI() {
    var input = document.getElementById("aiText");
    var chat = document.getElementById("chatBody");
    var question = input.value.trim();

    if (question === "") return;

    // Append user message
    chat.innerHTML += `<div class='ai-message user'>${question}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Show typing indicator
    let typingId = "typing-" + Date.now();
    chat.innerHTML += `
        <div id="${typingId}" class='ai-message bot typing'>
            <div class='dot'></div><div class='dot'></div><div class='dot'></div>
        </div>`;
    chat.scrollTop = chat.scrollHeight;

    // Simulate response delay
    setTimeout(() => {
        let el = document.getElementById(typingId);
        if(el) el.remove();
        var answer = askAI(question);
        chat.innerHTML += `<div class='ai-message bot'>${answer}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 800); 
}

// FIXED & ACCURATE INTELLIGENT MATCHING (WITH OFFICIAL WHATSAPP: 0179948746)
function askAI(question) {
    var q = question.toLowerCase();

    // 1. SPECIFIC ACTION: SHIPPING / POSTAGE
    if (/\b(ship|shipping|post|postage|shipped|cod|delivery|track|pos|poslaju|jnt|kurier|hantar)\b/.test(q)) {
        return "📦 <b>Shipping & Delivery Rates:</b><br><br>" +
               "• <b>West Malaysia (Semenanjung):</b> RM 5.00<br>" +
               "• <b>Sabah & Sarawak (East Malaysia):</b> RM 12.00<br>" +
               "• <b>International:</b> RM 25.00<br><br>" +
               "💡 <i>Tip: You can use promo code <b>QASABEFREESHIP</b> for free shipping on orders above RM40!</i>";
    }

    // 2. SPECIFIC ACTION: CONTACT / SUPPORT (OFFICIAL WHATSAPP UPDATED)
    if (/\b(contact|help|whatsapp|number|phone|email|support|hubungi|admin)\b/.test(q)) {
        return "☎️ <b>QASABE Customer Support:</b><br><br>" +
               "• 💬 <b>WhatsApp:</b> +6017-9948746 (9 AM - 10 PM daily)<br>" +
               "• ✉️ <b>Email:</b> helloqasabe@gmail.com<br>" +
               "• 📸 <b>Instagram:</b> @qasabecorp<br>" +
               "• 🎵 <b>TikTok:</b> @qasabe";
    }

    // 3. PRODUCT: REFRESH JUICE (RM 8.90)
    if (/\b(juice|drink|jus|beverage|cold pressed|cold-pressed|refresh|dahaga|air)\b/.test(q) && !/\b(herbal)\b/.test(q)) {
        return "🥤 <b>QASABE Refresh Juice (RM 8.90)</b><br>" +
               "• <b>Benefits:</b> Pure raw cold-pressed sugarcane elixir to reset hydration naturally without sugar crashes.<br>" +
               "• <b>Ingredients:</b> 100% Pure Cold-Pressed Sugarcane Extract. Zero added processed sugars or preservatives.<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('juice')\">Buy Refresh Juice 🛒</button>";
    }

    // 4. PRODUCT: ECO BAGASSE PACKAGING (RM 7.90 - RM 24.90)
    if (/\b(packaging|bagasse|container|box|bekas|eco|biodegradable|compostable)\b/.test(q)) {
        return "📦 <b>QASABE Eco Bagasse Packaging (RM 7.90 - RM 24.90)</b><br>" +
               "• <b>Benefits:</b> 100% biodegradable, heavy-duty food containers made from sugarcane fiber waste.<br>" +
               "• <b>Features:</b> Microwave-safe, freezer-stable, and highly oil/water resistant!<br>" +
               "• <b>Pax Options:</b> Available in 25pcs (RM7.90), 50pcs (RM13.90), or 100pcs (RM24.90).<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('bagasse-packaging')\">Buy Eco Packaging 🛒</button>";
    }

    // 5. PRODUCT: SUGARCANE CUBE (RM 14.90)
    if (/\b(cube|cubes|sweetener|gula|tiub|tiub gula|baking)\b/.test(q) && !/\b(liquid|drop)\b/.test(q)) {
        return "🧊 <b>QASABE Sugarcane Cube (RM 14.90)</b><br>" +
               "• <b>Benefits:</b> Unrefined raw sugarcane cubes processed without chemical sulfur bleaching or bone-char.<br>" +
               "• <b>Best For:</b> Coffee, artisanal teas, and luxury baking recipes.<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('organic-cube')\">Buy Sugarcane Cube 🛒</button>";
    }

    // 6. PRODUCT: LIQUID SWEETENER DROPS (RM 16.90)
    if (/\b(drop|drops|liquid|picit|titik|cehar)\b/.test(q)) {
        return "💧 <b>QASABE Liquid Sweetener Drops (RM 16.90)</b> <i><small>(NP: RM 20.80)</small></i><br>" +
               "• <b>Benefits:</b> Concentrated raw sugarcane drops for clutter-free, instant sweetness on-the-go.<br>" +
               "• <b>Features:</b> Pocket-friendly leak-proof bottle, dissolves instantly in hot or freezing drinks.<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('liquid-drop')\">Buy Liquid Drops 🛒</button>";
    }

    // 7. PRODUCT: ENERGY SNACK (RM 19.90)
    if (/\b(energy|snack|snackin|makan|lapar|diet|workout|calorie|calories|biskut|kuki|snacking)\b/.test(q)) {
        return "🍪 <b>QASABE Energy Snack (RM 19.90)</b><br>" +
               "• <b>Benefits:</b> Nutrient-dense clean fuel bar providing sustained low-glycemic energy.<br>" +
               "• <b>Nutrition:</b> Compact pocket-sized pack, high fiber, low saturated fats, zero trans-fats.<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('energy-snack')\">Buy Energy Snack 🛒</button>";
    }

    // 8. PRODUCT: SLEEP MIST (RM 24.90)
    if (/\b(sleep|mist|insomnia|tidur|stress|anxiety|resah|pillow|cadar|relax)\b/.test(q)) {
        return "🌙 <b>QASABE Sleep Mist (RM 24.90)</b> <i><small>(NP: RM 31.15)</small></i><br>" +
               "• <b>Benefits:</b> Therapeutic aromatherapy spray that triggers sensory calming pathways for deeper REM sleep.<br>" +
               "• <b>Key Blend:</b> French Lavender, Chamomile flower extract, and sugarcane distillate.<br>" +
               "• <b>Safe:</b> 100% oil-free micro-diffusion (won't stain linens) & kid-safe (2+ years).<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('sleep-mist')\">Buy Sleep Mist 🛒</button>";
    }

    // 9. PRODUCT: AHA TONER / SKINCARE (RM 26.90)
    if (/\b(toner|glow|skin|acne|jerawat|pore|pores|pori|dark spot|fleck|brighten|muka|kusam|dull|exfoliat)\b/.test(q)) {
        return "✨ <b>QASABE AHA Glow Toner (RM 26.90)</b><br>" +
               "• <b>Benefits:</b> Resurfacing treatment to clear dead skin buildup, smooth texture, and refine pore depth.<br>" +
               "• <b>Formula:</b> Sugarcane-derived AHA + Aloe Vera fillet juice (Gentle for sensitive skin!).<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('aha-toner')\">Buy AHA Toner 🛒</button>";
    }

    // 10. PRODUCT: BODY SCRUB (RM 28.90)
    if (/\b(scrub|body scrub|exfoliator|lulur|badan|daki)\b/.test(q)) {
        return "🧴 <b>QASABE Body Scrub (RM 28.90)</b><br>" +
               "• <b>Benefits:</b> Micro-milled raw sugarcane crystals polish skin into a luminous satin texture.<br>" +
               "• <b>Formula:</b> Natural glycolic acid fades dark elbows/knees, blended with virgin coconut & almond oil.<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('body-scrub')\">Buy Body Scrub 🛒</button>";
    }

    // 11. PRODUCT: HERBAL DRINK (RM 33.90)
    if (/\b(herbal|herba|panas badan|batuk|throat|cooling|panas)\b/.test(q)) {
        return "🌿 <b>QASABE Herbal Drink (RM 33.90)</b><br>" +
               "• <b>Benefits:</b> Harmonizing botanical blend formulated to downregulate internal heat stress and soothe strained throat tissue.<br>" +
               "• <b>Ingredients:</b> Sugarcane base with cooling roots and wild chrysanthemum decoctions.<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('herbal-drink')\">Buy Herbal Drink 🛒</button>";
    }

    // 12. PRODUCT: NOURISHING SHAMPOO (RM 49.00)
    if (/\b(shampoo|hair|rambut|kelembumur|dandruff|gugur|scalp|syampu)\b/.test(q)) {
        return "🧴 <b>QASABE Nourishing Shampoo (RM 49.00)</b><br>" +
               "• <b>Benefits:</b> Luxury sulfate-free scalp clarifying wash infusing sugarcane enzymes to strengthen roots.<br>" +
               "• <b>Formula:</b> Pro-Vitamin B5, micro-keratin proteins, 100% Free from Parabens & Silicones.<br><br>" +
               "<button class='quick-btn' onclick=\"goToProduct('shampoo')\">Buy Shampoo 🛒</button>";
    }

    // 13. AGENT / DROPSHIP (OFFICIAL WHATSAPP UPDATED)
    if (/\b(agent|dropship|join|sell|business|niaga|borong|wholesale)\b/.test(q)) {
        return "🤝 <b>Join the QASABE Business Team:</b><br><br>" +
               "• <b>Dropship (Zero Capital):</b> Earn up to 15% commission per sale. We handle packing & shipping!<br>" +
               "• <b>Agent (Low Capital):</b> Bulk purchase discounts up to 35% + marketing material provided.<br><br>" +
               "Interested? Drop us a WhatsApp text at <b>+6017-9948746</b> with the message <i>'I WANT TO JOIN AGENT'</i>! 🚀";
    }

    // 14. PROMO / COMBO
    if (/\b(promo|combo|discount|offer|deal|deals|pakej|package|diskaun|jimat)\b/.test(q)) {
        return "🎉 <b>QASABE Hot Deals & Special Vouchers:</b><br><br>" +
               "• 🚚 <b>QASABEFREESHIP:</b> Free shipping (Min spend RM 40)<br>" +
               "• 🎁 <b>WELCOME20:</b> 20% OFF (Min spend RM 100)<br>" +
               "• 💵 <b>TEBUCRAZE5:</b> RM 5 Flat Discount<br>" +
               "• 👑 <b>PLATINUM30:</b> 30% OFF (Min spend RM 150)<br><br>" +
               "<i>Enter these codes at the checkout page to apply discounts!</i> 💛";
    }

    // 15. FULL PRICE LIST
    if (/\b(price|prices|harga|cost|how much|berapa)\b/.test(q)) {
        return "💰 <b>QASABE Complete Official Catalog Prices:</b><br><br>" +
               "• 📦 <b>Eco Bagasse Packaging:</b> RM 7.90 - RM 24.90<br>" +
               "• 🥤 <b>Refresh Juice:</b> RM 8.90<br>" +
               "• 🧊 <b>Sugarcane Cube:</b> RM 14.90<br>" +
               "• 💧 <b>Liquid Sweetener Drops:</b> RM 16.90 *(OFFER)*<br>" +
               "• 🍪 <b>Energy Snack:</b> RM 19.90<br>" +
               "• 🌙 <b>Sleep Mist:</b> RM 24.90 *(OFFER)*<br>" +
               "• ✨ <b>AHA Glow Toner:</b> RM 26.90<br>" +
               "• 🧴 <b>Body Scrub:</b> RM 28.90<br>" +
               "• 🌿 <b>Herbal Drink:</b> RM 33.90<br>" +
               "• 💆‍♀️ <b>Nourishing Shampoo:</b> RM 49.00";
    }

    // 16. HOW TO BUY / ORDER
    if (/\b(checkout|pay|payment|online banking|fpx|touch n go|tng|credit card|cara beli|bayar)\b/.test(q) || (/\b(buy|order)\b/.test(q) && !/\b(price|harga)\b/.test(q))) {
        return "🛒 <b>How to Place Your Order:</b><br><br>" +
               "1. Select your desired product and click <b>Add to Cart</b>.<br>" +
               "2. Tap the Cart icon on top right menu.<br>" +
               "3. Enter shipping details.<br>" +
               "4. Pay securely via FPX Online Banking, Credit/Debit Card, or E-Wallets!<br>" +
               "<i>Note: Please log in to your QASABE account before checking out.</i>";
    }

    // 17. GREETINGS & THANKS
    if (/\b(hi|hello|hey|salam|assalamu|morning|afternoon|evening|hai|khabar)\b/.test(q)) {
        return "Hello there! 👋 Welcome to QASABE! How can I assist you today? Feel free to ask about any of our products or shipping rates!";
    }

    if (/\b(thank|thanks|terima kasih|tq|awesome|great)\b/.test(q)) {
        return "You're most welcome! 💛 Let me know if you need help with anything else. Happy shopping!";
    }

    // 18. FALLBACK DEFAULT
    return "I'm not quite sure I caught that. 😅 Could you try asking about specific products or contact info?<br><br>" +
           "You can ask me about:<br>" +
           "• ☎️ <i>What is the WhatsApp support number?</i><br>" +
           "• 📦 <i>How much is shipping?</i><br>" +
           "• 🥤 <i>Refresh Juice or Herbal Drink?</i><br>" +
           "• 💰 <i>Full Price List?</i>";
}
