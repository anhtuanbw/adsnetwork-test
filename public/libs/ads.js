window.onload = function () {
  if (window.AicactusSDK) {
    var sdk = window.AicactusSDK || {};
    var adUnits = [
      {
        inventoryId: 1,
        placementId: "display_ads",
        options: {
          video: {
            ima: false,
          },
          debug: true,
        },
      },
      {
        inventoryId: 2,
        placementId: "display_ads_1",
        options: {
          video: {
            ima: true,
            poster:
              "https://github.com/googleads/videojs-ima/blob/main/examples/posters/bbb_poster.jpg",
            source:
              "//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            type: "video/mp4",
          },
          debug: true,
        },
      },
      {
        inventoryId: 8,
        placementId: "display_ads_2",
        options: {
          video: {
            ima: false,
          },
          debug: true,
        },
      },
      {
        inventoryId: 9,
        placementId: "display_ads_3",
        options: {
          video: {
            ima: false,
          },
          debug: true,
        },
      },
      {
        inventoryId: 10,
        placementId: "display_ads_4",
        options: {
          video: {
            ima: false,
          },
          debug: true,
        },
      },
      {
        inventoryId: 20,
        placementId: "display_ads_5",
        options: {
          video: {
            ima: true,
            poster:
              "https://github.com/googleads/videojs-ima/blob/main/examples/posters/bbb_poster.jpg",
            source:
              "//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            type: "video/mp4",
          },
          debug: true,
        },
      },
    ];
    sdk.requestAds(adUnits);
  }
};
