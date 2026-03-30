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

  function initCalendlyTracking() {
    var urlParams = new URLSearchParams(window.location.search);
    var utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    var utmValues = {};

    utmKeys.forEach(function (key) {
      var value = urlParams.get(key);
      if (value) {
        utmValues[key] = value;
      }
    });

    if (!utmValues.utm_content) {
      var refId = urlParams.get("ref") || urlParams.get("ref_id");
      if (refId) {
        utmValues.utm_content = refId;
      }
    }

    if (Object.keys(utmValues).length > 0) {
      localStorage.setItem("calendly_utm", JSON.stringify(utmValues));
    } else {
      try {
        var storedUtm = localStorage.getItem("calendly_utm");
        utmValues = storedUtm ? JSON.parse(storedUtm) : {};
      } catch (error) {
        utmValues = {};
      }
    }

    if (Object.keys(utmValues).length === 0) {
      return;
    }

    var calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
    calendlyLinks.forEach(function (link) {
      try {
        var calendlyUrl = new URL(link.href);
        utmKeys.forEach(function (key) {
          if (utmValues[key]) {
            calendlyUrl.searchParams.set(key, utmValues[key]);
          }
        });
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
  initCalendlyTracking();
  initClarity();
})();
