  document.addEventListener("DOMContentLoaded", () => {
      gsap.registerPlugin(CustomEase);
      CustomEase.create(
        "hop",
        "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
      );
    
      const menu = document.querySelector(".menu");
      const links = document.querySelectorAll(".link");
      const socialLinks = document.querySelectorAll(".socials p");
    
      function splitTextIntoSpans(selector) {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          let text = element.innerText;
          let splitText = text
            .split("")
            .map(function (char) {
              return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
            })
            .join("");
          element.innerHTML = splitText;
        });
      }
    
      splitTextIntoSpans(".header-menu .header-menu-h3");
    
      // Trigger the animations when the page loads
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
      });
    
      // Animate main links when loading
      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });
    
      // Animate social links when loading
      gsap.to(socialLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });
    
      gsap.to(".video-wrapper", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        delay: 0.5,
      });
    
      // Animate header text rotation
      gsap.to(".header-menu .header-menu-h3 span", {
        rotateY: 0,
        stagger: 0.05,
        delay: 1.75,
        duration: 1.5,
        ease: "power4.out",
      });
    
      // Animate header text vertical movement
      gsap.to(".header-menu .header-menu-h3 span", {
        y: 0,
        scale: 1,
        stagger: 0.05,
        delay: 1.5,
        duration: 1.5,
        ease: "power4.out",
      });
    });
  function openSocialMedia(platform) {
    const urls = {
      instagram: "https://www.instagram.com/cinefirm_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      linkedin: "https://www.linkedin.com/company/cinefirm/?originalSubdomain=in",
      youtube: "https://www.youtube.com/@cinefirm",
      facebook: "https://www.facebook.com/shortfilmspromoting/",
      behance: "https://www.behance.net/cinefirm?tracking_source=search_projects%7Ccinefirm",
      googlemaps: "https://maps.app.goo.gl/QpAdckoYcT8A8QHPA"
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  }

  document.getElementById("instagram").addEventListener("click", function() {
    openSocialMedia('instagram');
  });

  document.getElementById("linkedin").addEventListener("click", function() {
    openSocialMedia('linkedin');
  });

  document.getElementById("Youtube").addEventListener("click", function() {
    openSocialMedia('youtube');
  });

  document.getElementById("facebook").addEventListener("click", function() {
    openSocialMedia('facebook');
  });

  document.getElementById("Benance").addEventListener("click", function() {
    openSocialMedia('behance');
  });  


  document.getElementById("google").addEventListener("click", function() {
    openSocialMedia('googlemaps');
  });  

  document.getElementById("callNumber").addEventListener("click", function() {
    window.open('tel:+919885859637', '_self'); // Opens phone dialer
  });
  document.getElementById("whatsapp").addEventListener("click", function() {
    window.open('https://api.whatsapp.com/send?phone=9885859637', '_blank'); // Opens WhatsApp chat
  });
  