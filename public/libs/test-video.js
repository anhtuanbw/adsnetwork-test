window.onload = () => {
  var autoplayAllowed = false;
  var autoplayRequiresMute = false;
  var player;
  var wrapperDiv;

  function checkUnmutedAutoplaySupport() {
    canAutoplay.video({ timeout: 100, muted: false }).then(function (response) {
      if (response.result === false) {
        // Unmuted autoplay is not allowed.
        checkMutedAutoplaySupport();
      } else {
        // Unmuted autoplay is allowed.
        autoplayAllowed = true;
        autoplayRequiresMute = false;
        initPlayer();
      }
    });
  }

  function checkMutedAutoplaySupport() {
    canAutoplay.video({ timeout: 100, muted: true }).then(function (response) {
      if (response.result === false) {
        // Muted autoplay is not allowed.
        autoplayAllowed = false;
        autoplayRequiresMute = false;
      } else {
        // Muted autoplay is allowed.
        autoplayAllowed = true;
        autoplayRequiresMute = true;
      }
      initPlayer();
    });
  }

  function initPlayer() {
    var vjsOptions = {
      autoplay: autoplayAllowed,
      muted: autoplayRequiresMute,
      debug: true,
    };
    player = videojs("content_video", vjsOptions);

    var imaOptions = {
      id: "content_video",
      adTagUrl:
        "https://staging-adnetwork-adserver.aicactus.io/serve-bid-video/gSoVw-M3_swr1b2-25wloR-VcIAdgRTBGlOo77-xFQbCD67v3ODLBLCETGyI_ROYB6hGL0BXMRPT1fPCTgkrfL8UxyLRAqGFftwhiR0n7JT9UuzgsnYK8oqss4qLvNOVHv2sjlhoNt__XmGss-eVwtonSLa4PyObxIy38tmOingmeBxVYXH8Q98Tfu3vCb4irNbwnUy3gm498MvhfS1pGCtiz23YeGyact3SLqz4SLQHUSssxceBXe7HKg0jvY9p.xml?rp={{AUCTION_PRICE}}&gdpr_consent=${GDPR_CONSENT_234}",
    };
    player.ima(imaOptions);

    if (!autoplayAllowed) {
      if (
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)
      ) {
        startEvent = "touchend";
      }

      wrapperDiv = document.getElementById("content_video");
      wrapperDiv.addEventListener(startEvent, initAdDisplayContainer);
    }
  }

  function initAdDisplayContainer() {
    player.ima.initializeAdDisplayContainer();
    wrapperDiv.removeEventListener(startEvent, initAdDisplayContainer);
  }

  var startEvent = "click";
  checkUnmutedAutoplaySupport();
};
