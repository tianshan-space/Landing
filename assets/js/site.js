(function () {
  "use strict";

  function getLanguage() {
    var lang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    return lang.indexOf("ka") === 0 ? "ka" : "en";
  }

  function getMessages() {
    var language = getLanguage();
    if (language === "ka") {
      return {
        requiredFields: "გთხოვთ შეავსოთ ყველა სავალდებულო ველი.",
        submitError: "მოთხოვნის გაგზავნისას დაფიქსირდა შეცდომა.",
        requestFailed: "მოთხოვნა ვერ გაიგზავნა."
      };
    }

    return {
      requiredFields: "Please fill in all required fields.",
      submitError: "Error submitting request.",
      requestFailed: "Request failed."
    };
  }

  function initWorkRequestForm() {
    var form = document.querySelector(".work-request");
    if (!form) {
      return;
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      var messages = getMessages();
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var selectedServices = Array.from(
        document.querySelectorAll(".work-request--options input:checked")
      ).map(function (checkbox) {
        return checkbox.value;
      });

      if (!name || !email) {
        alert(messages.requiredFields);
        return;
      }

      var firebaseUrl = "https://tianshan-space-default-rtdb.firebaseio.com/workRequests.json";
      var requestData = {
        name: name,
        email: email,
        selectedServices: selectedServices,
        timestamp: new Date().toISOString()
      };

      try {
        var response = await fetch(firebaseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok) {
          document.getElementById("success-message").style.display = "block";
          form.reset();
        } else {
          alert(messages.submitError);
        }
      } catch (error) {
        console.error("Error:", error);
        alert(messages.requestFailed);
      }
    });
  }

  function initCalendlyRefTracking() {
    var urlParams = new URLSearchParams(window.location.search);
    var refId = urlParams.get("ref") || urlParams.get("ref_id");

    if (refId) {
      localStorage.setItem("calendly_ref_id", refId);
    } else {
      refId = localStorage.getItem("calendly_ref_id");
    }

    if (!refId) {
      return;
    }

    var calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
    calendlyLinks.forEach(function (link) {
      try {
        var calendlyUrl = new URL(link.href);
        if (!calendlyUrl.searchParams.get("utm_source")) {
          calendlyUrl.searchParams.set("utm_source", "website");
        }
        if (!calendlyUrl.searchParams.get("utm_medium")) {
          calendlyUrl.searchParams.set("utm_medium", "landing");
        }
        calendlyUrl.searchParams.set("utm_content", refId);
        link.href = calendlyUrl.toString();
      } catch (error) {
        console.error("Invalid Calendly URL:", link.href, error);
      }
    });
  }

  function initClarity() {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "q6913xit71");
  }

  initWorkRequestForm();
  initCalendlyRefTracking();
  initClarity();
})();
