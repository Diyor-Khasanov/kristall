document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Tugmani yuklanish holatiga o'tkazish
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Yuborilmoqda...";
    submitBtn.disabled = true;

    // Forma ma'lumotlarini yig'amiz
    const formData = {
      name: document.getElementById("name").value,
      tel: document.getElementById("tel").value,
      message: document.getElementById("message").value,
    };

    try {
      // Telegram Bot API so'rovini yuboramiz
      const BOT_TOKEN = "7934129067:AAGMZnKP-0bvAlFRcb_cYEWM2Ds4wDsp2ug";
      const CHAT_ID = "805248767"; // O'zgartiring!

      const text = `📞 <b>Yangi murojaat!</b>\n\n👤 <b>Ism:</b> ${formData.name}\n📱 <b>Telefon:</b> ${formData.tel}\n\n📝 <b>Xabar:</b>\n${formData.message}`;

      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: "HTML",
          }),
        }
      );

      const result = await response.json();

      // Natijani ko'rsatamiz
      const resultDiv = document.getElementById("formResult");
      if (result.ok) {
        resultDiv.innerHTML = `
          <div style="padding: 10px; background: #d4edda; color: #155724; border-radius: 4px;">
            Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
          </div>
        `;
        document.getElementById("contactForm").reset();
      } else {
        resultDiv.innerHTML = `
          <div style="padding: 10px; background: #f8d7da; color: #721c24; border-radius: 4px;">
            Xabar yuborishda xatolik. Iltimos, keyinroq urunib ko'ring.
          </div>
        `;
      }
      resultDiv.style.display = "block";
    } catch (error) {
      const resultDiv = document.getElementById("formResult");
      resultDiv.innerHTML = `
        <div style="padding: 10px; background: #f8d7da; color: #721c24; border-radius: 4px;">
          Tarmoq xatosi. Internet aloqasini tekshiring.
        </div>
      `;
      resultDiv.style.display = "block";
    } finally {
      // Tugmani asl holatiga qaytarish
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
