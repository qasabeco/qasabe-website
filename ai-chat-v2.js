// 1. INJECT CHAT INTERFACE & FLOATING BUTTON INTO THE BODY
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
            <button class="quick-btn" onclick="quickAsk('What is QASABE made of?')">🌿 Ingredients?</button>
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

// 2. SUBMIT ON ENTER KEY
document.getElementById("aiText").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendAI();
    }
});

// 3. TOGGLE CHAT BOX
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

// 4. QUICK SUGGESTION BUTTONS
function quickAsk(text) {
    document.getElementById("aiText").value = text;
    sendAI();
}

// 5. SEND MESSAGE & SHOW TYPING ANIMATION
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
    }, 1000); 
}

function askAI(question) {
    var q = question.toLowerCase();

    // --- CATEGORY: SLEEP MIST ---
    if (/\bsleep\b|\bmist\b/.test(q)) {
        return "🌙 **QASABE Sleep Mist ($24.90 / RM24.90)**<br>" +
               "• **Benefits:** Calms the mind, reduces anxiety/stress, and promotes a deeper sleep cycle.<br>" +
               "• **How to use:** Spray lightly onto your pillow or bedding 10 minutes before going to sleep.<br>" +
               "• **Key Ingredients:** Natural sugarcane extract infused with therapeutic lavender notes.<br>" +
               "• **Is it safe for kids?** Yes! Formulated with organic ingredients, making it completely safe for toddlers and kids aged 2 and above.<br><br>" +
               "<button class='quick-btn' onclick=\"window.location.href='product-detail.html?id=sleep-mist'\">Buy Now 🛒</button>";
    }
    
    // --- CATEGORY: GLOW TONER ---
    if (/\bskin\b|\btoner\b|\bglow\b/.test(q)) {
        return "✨ **QASABE Glow Toner ($26.90 / RM26.90)**<br>" +
               "• **Benefits:** Deeply hydrates, naturally brightens the complexion, and refines pores.<br>" +
               "• **How to use:** Apply onto a cotton pad or pat gently into clean skin morning and night.<br>" +
               "• **Formula:** Packed with natural Glycolic Acid (AHA) derived from sugarcane for gentle daily exfoliation.<br>" +
               "• **For Sensitive Skin?** Absolutely! Our formula is alcohol-free, paraben-free, and dermatologically tested for sensitive skin types.<br><br>" +
               "<button class='quick-btn' onclick=\"window.location.href='product-detail.html?id=glow-toner'\">Buy Now 🛒</button>";
    }
    
    // --- CATEGORY: ENERGY SNACK ---
    if (/\benergy\b|\bsnack\b|\bsugarcane\b/.test(q)) {
        return "🍪 **QASABE Energy Snack ($19.90 / RM19.90)**<br>" +
               "• **Benefits:** Provides a quick, natural energy boost without the harsh sugar crashes.<br>" +
               "• **Perfect For:** Active lifestyles, workouts, or as a healthy snack during work/study hours.<br>" +
               "• **Formula:** Crafted using premium organic sugarcane fiber and wholesome, nutrient-dense ingredients.<br>" +
               "• **Calories:** Only 120 kcal per serving! High fiber, low GI, and zero artificial preservatives.<br><br>" +
               "<button class='quick-btn' onclick=\"window.location.href='product-detail.html?id=energy-snack'\">Buy Now 🛒</button>";
    }

    // --- CATEGORY: PROMO / COMBO RATES ---
    if (/\bpromo\b|\bcombo\b|\bdiscount\b|\boffer\b|\bdeal\b/.test(q)) {
        return "🎉 **QASABE Golden Deals & Combos:**<br><br>" +
               "• **Twin Glow Pack:** Get 2x Glow Toners for only **RM48** (Save RM5.80!)<br>" +
               "• **Deep Sleep Set:** Sleep Mist + Glow Toner for **RM45** + Free Premium Velvet Pouch!<br>" +
               "• **Ultimate Qasabe Box:** 1x Mist, 1x Toner, 1x Snack for **RM60** (Free Shipping included!)<br><br>" +
               "*Type 'buy' to learn how to place your order!* 💛";
    }

    // --- CATEGORY: DISTRIBUTOR / AGENT / DROPSHIP ---
    if (/\bagent\b|\bdropship\b|\bjoin\b|\bsell\b|\bbusiness\b/.test(q)) {
        return "🤝 **Join the QASABE Family! (Agent & Dropship):**<br><br>" +
               "We are actively looking for passionate partners to grow with us! <br>" +
               "• **Dropship (Zero Capital):** Earn up to 15% commission per sale. We handle the shipping for you!<br>" +
               "• **Agent (Low Capital):** Bulk purchase discounts up to 35% + free marketing materials.<br><br>" +
               "Interested? Drop us a WhatsApp text at **+6011-1223456** with the keyword 'I WANT TO JOIN'! 🚀";
    }

    // --- CATEGORY: FULL PRICE LIST ---
    if (/\bprice\b|\bprices\b|\bcost\b|\bhow much\b/.test(q)) {
        return "💰 **QASABE Product Catalog Prices:**<br><br>" +
               "• 🌙 **Sleep Mist:** RM24.90<br>" +
               "• ✨ **Glow Toner:** RM26.90<br>" +
               "• 🍪 **Energy Snack:** RM19.90<br><br>" +
               "*Psst! Create an account today to score a **20% OFF discount** on your first purchase!* 💛";
    }

    // --- CATEGORY: SHIPPING & COD ---
    if (/\bpost\b|\bpostage\b|\bshipped\b|\bship\b|\bcod\b|\bdelivery\b|\btrack\b/.test(q)) {
        return "📦 **Shipping, Delivery & Tracking:**<br><br>" +
               "• **West Malaysia:** RM8 (Free shipping for orders above RM80!)<br>" +
               "• **East Malaysia:** RM15<br>" +
               "• **Delivery Time:** Orders placed before 12 PM are shipped out on the *same day*. Expect delivery in 2-4 business days.<br>" +
               "• **How to Track?** Once shipped, an SMS with your tracking link (J&T / PosLaju) will be sent to your phone!";
    }

    // --- CATEGORY: QUALITY, HALAL, SAFETY ---
    if (/\bmade\b|\bingredient\b|\bingredients\b|\bhalal\b|\bsafe\b|\bprocess\b|\borganic\b/.test(q)) {
        return "🌿 **QASABE Quality Standards:**<br><br>" +
               "1. **100% Organic:** Uses locally sourced premium sugarcane as our core foundation.<br>" +
               "2. **Halal Compliant:** Formulated and packaged strictly adhering to clean, Halal-certified guidelines.<br>" +
               "3. **Certified Clean:** Manufactured in a state-of-the-art GMP (Good Manufacturing Practice) facility.<br>" +
               "4. **Cruelty-Free:** Absolutely no animal testing is done on our cosmetic or wellness range.";
    }

    // --- CATEGORY: HOW TO BUY ---
    if (/\bbuy\b|\bhow to\b|\border\b|\bcheckout\b|\bpay\b|\bpayment\b/.test(q)) {
        return "🛒 **How to place an order at QASABE:**<br><br>" +
               "1. Browse through our products on the homepage.<br>" +
               "2. Click the **Add to Cart** or **Buy Now** button.<br>" +
               "3. Tap the cart icon at the top right corner to proceed to Checkout.<br>" +
               "4. We accept Online Banking (FPX), Credit/Debit Cards, and popular E-Wallets!";
    }

    // --- CATEGORY: REFUND & RETURNS ---
    if (/\brefund\b|\bbroken\b|\bdamaged\b|\breturn\b|\breplacement\b/.test(q)) {
        return "⚠️ **Refund & Return Policy:**<br><br>" +
               "We've got you covered! If your item arrives broken, leaking, or incorrect, reach out to us within **7 days** of delivery for a replacement or a full refund. Please provide an unboxing video or photo as proof! 💛";
    }

    // --- CATEGORY: CONTACT INFO ---
    if (/\bcontact\b|\bhelp\b|\bwhatsapp\b|\bnumber\b|\bphone\b|\bemail\b|\bsupport\b/.test(q)) {
        return "☎️ **Get in touch with QASABE Support:**<br><br>" +
               "• ✉️ **Email:** helloqasabe@gmail.com<br>" +
               "• 💬 **WhatsApp:** +6011-1223456<br>" +
               "• 📸 **Instagram:** @qasabecorp<br>" +
               "• 🎵 **TikTok:** @qasabe<br><br>" +
               "You can also click the 'Contact' page on our website menu to drop us a direct line!";
    }

    // --- CATEGORY: FALLBACK DEFAULT ---
    return "I'm not quite sure I understand that question. 😅<br><br>" +
           "Try asking me about:<br>" +
           "• 🎁 **Promo Deals** & Combo Offers?<br>" +
           "• 🤝 How to join as **Agent / Dropship**?<br>" +
           "• 🌿 Ingredients & Skin Safety?<br>" +
           "• 📦 Shipping & Order Tracking?";
}