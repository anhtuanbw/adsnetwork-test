import { Col, Row } from "antd";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import slugify from "slugify";

import { FEATURE_IDS } from "../common/defines";
import useProductData from "../common/useProductData";
import JsonViewer from "../components/JsonViewer";
import LayoutOne from "../components/layouts/LayoutOne";
import Container from "../components/other/Container";
import Banners from "../components/shop/Banners";
import ShopLayout from "../components/shop/ShopLayout";
import productData from "../data/product.json";

export default function Home() {
  const router = useRouter();

  const [resJson, setResJson] = React.useState({});

  React.useEffect(() => {
    window.addEventListener("load", async () => {
      if (window.AicactusSDK) {
        const sdk = window.AicactusSDK || {};

        const adUnits = [
          {
            inventoryId: 1,
            placementId: "display_ads",
          },
          {
            inventoryId: 2,
            placementId: "display_ads_1",
            options: {
              video: {
                player: true,
                preventPauseWhenClick: false,
              },
              debug: true,
            },
          },
          {
            inventoryId: 8,
            placementId: "display_ads_2",
          },
          {
            inventoryId: 9,
            placementId: "display_ads_3",
          },
          {
            inventoryId: 10,
            placementId: "display_ads_4",
          },
          {
            inventoryId: 20,
            placementId: "display_ads_5",
            options: {
              video: {
                player: false,
                size: {
                  width: 1600,
                  height: 900,
                  // width: 1920,
                  // height: 1080,
                },
              },
              debug: true,
            },
          },
        ];

        // const adUnits = [
        //   {
        //     inventoryId: 24,
        //     placementId: "display_ads_1",
        //     options: {
        //       video: {
        //         usePlayer: false,
        //       },
        //       debug: true,
        //     },
        //   },
        //   {
        //     inventoryId: 23,
        //     placementId: "display_ads_2",
        //     options: {
        //       video: {
        //         usePlayer: false,
        //       },
        //       debug: true,
        //     },
        //   },
        //   {
        //     inventoryId: 22,
        //     placementId: "display_ads_3",
        //     options: {
        //       video: {
        //         usePlayer: false,
        //       },
        //       debug: true,
        //     },
        //   },
        //   {
        //     inventoryId: 21,
        //     placementId: "display_ads_4",
        //     options: {
        //       video: {
        //         usePlayer: false,
        //       },
        //       debug: true,
        //     },
        //   },
        // ];
        const res = await sdk.requestAds(adUnits);

        sdk.on("ALL_ADS_COMPLETED", (data) => {
          console.log("ALL_ADS_COMPLETED: ", data);
        });

        setResJson(res);

        var autoplayAllowed = false;
        var autoplayRequiresMute = false;
        var player;
        var wrapperDiv;

        function checkUnmutedAutoplaySupport() {
          canAutoplay
            .video({ timeout: 100, muted: false })
            .then(function (response) {
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
          canAutoplay
            .video({ timeout: 100, muted: true })
            .then(function (response) {
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
            adTagUrl: res.videos[0].vastTagURL,
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

        if (res?.videos?.length) {
          // checkUnmutedAutoplaySupport();
          initPlayer();
        }
      }
    });
  }, []);

  return (
    <LayoutOne title="Home">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
              process.env.NODE_ENV === "development"
                ? "https://localhost:9081/aicactus-sdk.development.min.js"
                : "https://cdn.aicactus.io/aicactus-sdk.staging.min.js"
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load( function(){AicactusSDK.initialize({containerId:"b8a3ccf2-5d49-4912-b2cc-87dc46e10277@web", type: ["adnetwork", "dmp"], debug: true}),AicactusSDK.callMethodsFromContainer();
            });
            `,
          }}
        ></script>

        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/node_modules/video.js/dist/video-js.min.css"
        />
        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.css"
        />
        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/dist/videojs.ima.css"
        />
      </Head>
      <div className="shop-layout">
        <Container type={"fluid"}>
          <Row
            gutter={30}
            style={{
              marginBottom: 40,
            }}
          >
            <Col className="gutter-row" xs={24}>
              {navigator.userAgent}
            </Col>
          </Row>
          <Row
            gutter={30}
            style={{
              marginBottom: 40,
            }}
          >
            <Col className="gutter-row" xs={24}>
              <JsonViewer src={resJson} />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="gutter-row">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus et erat et arcu commodo scelerisque eget malesuada
                ligula. Donec interdum eu quam quis egestas. In finibus, felis
                vel vestibulum maximus, eros velit accumsan metus, a mollis est
                nisi ut magna. Aliquam erat volutpat. Morbi iaculis mauris ac
                lorem dignissim congue. Duis porttitor orci quam, eu porttitor
                ligula eleifend et. Morbi eget enim in urna tempor blandit vel
                in mi. Suspendisse eros arcu, dapibus in interdum at, finibus
                rhoncus eros. Mauris ligula mauris, finibus non accumsan
                molestie, rhoncus ac enim. Cras vitae dui euismod, dapibus lorem
                quis, ullamcorper augue. Sed laoreet eros ut dui cursus, at
                commodo tellus maximus. Ut quis mauris quis metus luctus
                hendrerit. Fusce rhoncus pellentesque mollis. Nunc lobortis
                augue at lectus eleifend porttitor. Duis at libero a nisl
                suscipit gravida. Mauris dignissim tincidunt dui, non volutpat
                dolor commodo a. Duis eu est sit amet risus suscipit blandit sed
                quis nunc. Quisque eget diam bibendum, tincidunt ipsum eget,
                luctus dolor. Aliquam ut dolor ac lorem vehicula maximus et nec
                justo. Nullam a egestas quam. Vivamus quis neque placerat,
                pharetra velit vitae, auctor neque. Curabitur congue, lectus
                elementum vehicula lacinia, diam ipsum pretium odio, et
                tincidunt mauris metus et elit. Etiam facilisis venenatis
                tellus, ac tristique odio dignissim non. Cras tristique ipsum et
                dolor rhoncus euismod. Sed non metus laoreet, ultrices risus
                non, egestas turpis. Aenean ac molestie nisi. Nulla diam arcu,
                maximus eget ligula ut, vehicula accumsan ipsum. Integer aliquet
                nisi sit amet felis tempor tincidunt. Duis finibus massa urna,
                vitae sagittis urna molestie dictum. Duis dolor massa, molestie
                elementum consequat eu, mattis eu lacus. Suspendisse nisl sem,
                venenatis sed arcu ullamcorper, placerat imperdiet justo. Nullam
                vitae est mollis, sollicitudin nisl vel, rutrum ex. Donec vitae
                bibendum ipsum, egestas vestibulum nisl. Morbi ornare rhoncus
                felis, et laoreet ex consequat nec. Aenean iaculis, mauris ac
                fermentum dictum, tortor neque commodo felis, nec blandit tortor
                mauris pulvinar tortor. Sed eu tortor quis ante lacinia egestas
                cursus vitae odio. Vivamus accumsan varius sem nec tincidunt.
                Integer eu tellus eu nulla laoreet dapibus mattis non nisl.
                Praesent cursus semper luctus. In interdum volutpat leo, quis
                euismod tellus egestas et. Aenean congue tempor erat, vulputate
                malesuada augue maximus at. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus.
                Pellentesque ac odio enim. Maecenas sit amet velit mi. Duis
                auctor purus a urna vehicula, at tincidunt neque eleifend. Ut id
                massa facilisis, finibus mauris sit amet, tempor quam. Nam
                vehicula eget lorem quis semper. Integer varius sollicitudin
                erat, in cursus metus fringilla vel. Cras vestibulum dignissim
                elit, id lobortis augue. Duis laoreet metus sed neque euismod
                suscipit. Morbi lobortis nec ligula at lacinia. Quisque eu dolor
                in ante convallis cursus quis vitae purus. Maecenas dapibus
                volutpat risus, quis feugiat ante fermentum sed. Curabitur
                molestie arcu dolor, a elementum ipsum tempor non. Vestibulum eu
                tincidunt leo. Aliquam vulputate, odio vitae convallis dictum,
                arcu sapien varius erat, vitae lacinia urna enim vitae erat.
                Praesent quis luctus lectus, id eleifend ligula. Duis interdum
                semper efficitur. Mauris id gravida mauris. Vestibulum at ex
                tellus. Maecenas convallis rhoncus gravida. Mauris non sem
                convallis, interdum lacus rhoncus, sagittis arcu. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Suspendisse et rutrum eros. Nunc eget tortor ac
                est hendrerit efficitur quis porta lorem. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Praesent efficitur, urna et dignissim rhoncus, enim
                sapien varius ipsum, ut rhoncus nunc ex eget nibh. Nulla id
                dapibus ante. Donec posuere lectus ligula, eu laoreet tortor
                mattis non. Ut lacinia convallis magna a iaculis. Pellentesque
                elementum sem erat, ac scelerisque nisi vehicula vitae. Quisque
                nec turpis placerat, finibus dolor vel, luctus nibh. Nullam non
                odio dignissim, sagittis nisi vitae, facilisis velit.
                Pellentesque ornare nulla in velit sollicitudin congue. Donec ac
                varius sapien. Cras faucibus, dolor vitae varius venenatis,
                massa felis posuere eros, vulputate mollis dui est non purus.
                Nulla eu leo et metus imperdiet mattis. Integer ultricies nisl
                tortor, a vestibulum ex tincidunt eu. Vivamus vel nunc at ante
                sagittis auctor ac sed ligula. Vestibulum nec quam pellentesque,
                consequat mi vitae, gravida tortor. Aliquam rutrum ante vehicula
                eros elementum viverra. Fusce in varius neque, ultrices aliquet
                mi. Sed euismod efficitur ultrices. Ut a arcu lobortis,
                malesuada metus in, tempor lacus. Nunc at neque sit amet erat
                lobortis semper. Maecenas consectetur elementum luctus. Quisque
                libero nulla, vestibulum non arcu vel, volutpat accumsan orci.
                Maecenas a aliquam elit. Nam sed eros luctus, pulvinar sem et,
                pretium odio. Vestibulum mollis nibh rutrum, hendrerit nulla
                efficitur, mollis augue. Donec suscipit nibh vel tempus auctor.
                Sed suscipit massa et finibus sagittis. Etiam elementum eu mi
                eget efficitur. Sed vulputate volutpat urna non imperdiet.
                Maecenas eget bibendum turpis, in aliquam erat. Donec vestibulum
                urna ac lacus commodo, ac elementum massa iaculis. Ut nec sem eu
                eros rhoncus tincidunt. Phasellus non condimentum eros.
                Curabitur interdum venenatis metus sit amet pretium. Nullam
                augue libero, aliquet mattis turpis et, imperdiet rutrum ligula.
                Nullam a tellus eget mi semper placerat. Proin arcu orci,
                venenatis ac rhoncus ut, tincidunt id diam. Vestibulum nec dui
                vitae turpis blandit vulputate at nec elit. Mauris sit amet enim
                interdum, aliquam felis ac, congue purus. Vestibulum fermentum,
                dolor nec efficitur suscipit, ligula mauris blandit lacus, id
                ultricies massa tortor non nulla. Quisque nibh dolor, accumsan
                vitae urna non, dignissim eleifend turpis. Vestibulum pharetra
                pellentesque turpis, at congue velit gravida sit amet. Integer
                fermentum in elit in pretium. Donec pretium ipsum eget tempor
                viverra. Integer tempor nisi ut sapien aliquam, vel venenatis
                nibh pellentesque. Aliquam fringilla accumsan auctor. Integer et
                risus odio. In iaculis nisl lectus, ac dignissim tellus
                hendrerit non. Aliquam luctus augue vitae arcu aliquet, ac
                sollicitudin sem auctor. Mauris quis tincidunt ante. Nullam
                tincidunt molestie dignissim. Morbi augue erat, venenatis eu
                eleifend ut, consequat id nulla. Mauris ut sem porttitor risus
                volutpat elementum. Quisque pretium porttitor eros, nec ultrices
                metus commodo ut. Aliquam pulvinar dictum ipsum. Quisque sodales
                mollis nisi, eget auctor sapien sollicitudin a. Phasellus in
                maximus mauris, id accumsan tellus. Etiam augue massa, dictum
                quis felis gravida, tempus placerat eros. Vestibulum elit
                mauris, ultrices et orci sit amet, suscipit feugiat turpis.
                Donec et lectus sit amet orci aliquam luctus. Suspendisse sed mi
                vel odio bibendum volutpat. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                Donec lacinia dui congue nisi elementum cursus. Duis eget odio
                sem. Sed mattis urna in iaculis commodo. Quisque lacus odio,
                egestas id tincidunt id, congue id erat. Duis varius justo at
                diam fermentum varius in non magna. Aliquam gravida, sem in
                congue mollis, enim erat ultricies tellus, ac interdum turpis
                urna ac lorem. Vestibulum tincidunt, neque a iaculis fermentum,
                ante nisl pulvinar mi, nec ultrices orci purus vel orci.
                Pellentesque mattis vulputate magna id ornare. Aenean vitae
                augue egestas, dapibus dolor molestie, semper velit. Nam eu ante
                pharetra, mattis risus id, placerat nisl. Proin dignissim mauris
                vitae pellentesque lacinia. Nunc id porttitor mi. Fusce dictum
                non nulla et scelerisque. Vestibulum hendrerit massa a nisi
                pharetra iaculis. Nam sollicitudin, nisi eu vulputate pharetra,
                mi nunc pellentesque ante, in dapibus urna ipsum id purus. Donec
                a condimentum risus, vel cursus nulla. Donec ut augue nec ex
                condimentum egestas vel quis velit. Ut ut ante et purus pharetra
                sollicitudin. Praesent commodo ante vel ipsum malesuada porta.
                Ut lobortis pulvinar varius. Integer purus purus, ultricies ac
                pulvinar ac, condimentum ut nibh. Mauris ac blandit erat. Morbi
                ornare sapien ut malesuada ultricies. Vestibulum pharetra tellus
                mi, vitae scelerisque mauris placerat non. Suspendisse quam
                nisi, aliquet a tristique vitae, condimentum vehicula mi.
                Integer et ultricies libero. Maecenas efficitur sapien felis,
                vitae laoreet ante auctor lacinia. Quisque est leo, consequat eu
                neque at, euismod pharetra tellus. Phasellus dignissim eros
                ultricies ullamcorper lacinia. Donec tempor ante sit amet lectus
                mattis elementum. Nunc bibendum urna eu purus vehicula, at
                vestibulum lacus dignissim. Nunc felis est, varius in purus et,
                fermentum ornare risus. Ut dictum massa nibh, et vulputate enim
                dignissim tincidunt. Aenean eget leo ac est sodales tristique
                suscipit a mi. Curabitur ac gravida leo, a vulputate tortor.
                Nulla quis purus felis. Quisque tincidunt vehicula dignissim.
                Nunc in diam ac justo vulputate volutpat non vel quam.
                Pellentesque iaculis ut ligula sed egestas. Morbi finibus id
                massa gravida ultricies. Proin eleifend in risus at mollis.
                Praesent tincidunt sollicitudin ante nec tempus. Cras accumsan
                sem a diam ultricies sollicitudin. Maecenas mollis libero in
                purus mattis, ac aliquam justo condimentum. Mauris vel diam
                mauris. Cras eu orci augue. Donec mollis ipsum at neque cursus
                porta. Maecenas ipsum justo, lacinia ut arcu nec, vestibulum
                lacinia libero. Suspendisse potenti. Phasellus vitae efficitur
                sem. Maecenas tempor consequat leo. Praesent sed blandit libero.
                Aenean a posuere diam, eget dignissim enim. Aliquam consequat
                augue lectus, semper egestas arcu fringilla eget. Proin non
                libero posuere, rutrum ante pharetra, congue eros. Sed eget
                condimentum odio. In diam ipsum, euismod a neque id, hendrerit
                bibendum arcu. In est ex, consequat in sollicitudin nec, cursus
                eget nunc. Pellentesque non massa nec dui dapibus viverra.
                Aliquam feugiat ligula odio, nec consequat nisi tincidunt nec.
                Vivamus tortor ante, feugiat vel accumsan ut, pretium eu odio.
                Fusce ut ante metus. Morbi a nibh sem. Quisque consectetur,
                lacus quis rhoncus maximus, ipsum arcu aliquam purus, ac sodales
                massa leo sit amet sem. Quisque quis finibus nulla. Suspendisse
                sagittis finibus ex a venenatis. Donec vitae interdum ex, vel
                ullamcorper augue. Praesent quis odio odio. Cras et aliquet
                nunc. Aenean eget lectus at risus sagittis volutpat. Sed iaculis
                magna porttitor, dictum lorem non, pretium nibh. Praesent
                consectetur lacinia fermentum. Sed pharetra ac neque et
                elementum. Aliquam erat volutpat. Maecenas vestibulum orci
                malesuada erat hendrerit, nec suscipit dui egestas. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Vivamus nec maximus felis, at vulputate mauris.
                Donec vitae augue porta justo accumsan gravida ut nec lacus.
                Praesent pellentesque euismod erat. Fusce sed nunc sit amet
                mauris rhoncus iaculis auctor nec arcu. Quisque pharetra turpis
                quis massa luctus posuere. Ut eu laoreet diam. Ut sit amet
                vehicula erat. Proin placerat semper libero, at ultricies libero
                feugiat tempus. In ac arcu at arcu tincidunt varius eget a
                purus. Sed sed rutrum sapien. Curabitur in justo neque. Maecenas
                sed pulvinar ante, eu laoreet mi. Donec mauris massa, vulputate
                vitae tincidunt id, viverra ut ante. Aliquam eros velit, posuere
                nec rutrum imperdiet, condimentum quis lorem. Suspendisse
                potenti. Quisque quis diam libero. Nulla sed erat vel enim
                tempor posuere non eu eros. Nunc vestibulum gravida arcu, nec
                gravida nulla ultricies vel. In vitae ultrices felis. Ut
                venenatis, sem eu lobortis molestie, orci turpis dignissim diam,
                a varius felis orci quis sem. Praesent pretium est sed lectus
                condimentum lobortis. Vivamus faucibus tortor sed vehicula
                ultrices. Etiam luctus mauris ut lectus hendrerit aliquet.
                Quisque justo turpis, consequat sed placerat quis, molestie
                vitae est. Pellentesque at libero consectetur, tempor dui et,
                laoreet odio. Maecenas non bibendum orci, vitae iaculis est. Nam
                sagittis nisi sed nisl convallis sagittis vitae id risus. Sed eu
                fringilla neque, a semper enim. Quisque lorem diam, tincidunt a
                condimentum eu, congue ut purus. Sed vulputate at ipsum in
                egestas. Aliquam tincidunt tellus enim, quis pellentesque orci
                finibus vitae. Cras pretium lorem in pellentesque pharetra.
                Suspendisse tristique venenatis magna, sed dictum urna efficitur
                vel. Phasellus lacus odio, commodo sed mi congue, finibus
                dapibus ligula. Phasellus imperdiet felis faucibus turpis
                viverra, non rhoncus est molestie. Nulla ac orci id purus
                dapibus eleifend eleifend nec urna. Phasellus cursus nisl nec
                neque pulvinar, id rhoncus velit placerat. Maecenas ut
                pellentesque justo. Suspendisse faucibus ornare libero, ac
                rutrum metus aliquam id. Cras efficitur mattis est sed interdum.
                Donec vitae sem ut elit lacinia condimentum. Duis molestie, nisl
                eget sollicitudin elementum, velit libero dapibus libero, quis
                hendrerit odio massa ut nisi. Sed tristique semper lacus, sit
                amet euismod massa imperdiet varius. Integer tellus est, aliquet
                nec mollis at, commodo non est. Pellentesque auctor neque ut
                nulla porta imperdiet. Vivamus sed libero eget turpis efficitur
                aliquam. Nam porttitor fermentum velit quis vulputate. Nulla
                eget mi eu nisl facilisis tempor eget sit amet leo. Aliquam non
                pellentesque dolor. Maecenas quam neque, auctor at leo vel,
                fermentum lobortis mauris. Curabitur pretium varius ligula, a
                cursus sem mattis ut. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas. Donec a
                accumsan mauris, in pretium libero. Sed non tempor metus. Morbi
                iaculis vel nunc porttitor tempus. Aliquam posuere ornare massa,
                in scelerisque nisl tempor a. Curabitur rutrum tempor risus quis
                fringilla. Duis leo urna, blandit quis viverra sed, semper eu
                est. Nullam tincidunt imperdiet diam vitae elementum. In quis
                suscipit nisl. Vivamus porttitor vulputate velit, vel pulvinar
                velit porta at. Fusce sed nisi eros. Nam et ante vitae magna
                interdum pulvinar. Aliquam vel diam in quam tristique finibus a
                suscipit leo. Duis facilisis enim eu purus hendrerit, vitae
                vestibulum diam pharetra. Nullam quis felis eget ligula faucibus
                gravida eu eget est. Vestibulum vel dignissim arcu. Etiam
                ornare, ipsum quis feugiat volutpat, ante arcu interdum massa,
                sed pharetra velit urna eu libero. Aenean consectetur arcu ac
                metus sollicitudin, at sagittis mauris semper. Pellentesque leo
                enim, pharetra vitae urna in, auctor commodo magna. Etiam
                volutpat congue fringilla. Cras aliquam cursus lectus, vel
                egestas magna finibus ut. Integer dictum ligula in malesuada
                cursus. Integer est mauris, mattis eu volutpat vel, luctus vel
                lectus. Proin mi justo, laoreet sed facilisis et, laoreet id
                est. Cras porttitor libero et sagittis sollicitudin. Proin
                pellentesque risus ut diam vehicula varius. Nam et tortor et
                eros pulvinar molestie aliquet nec eros. Aenean faucibus
                efficitur urna quis consectetur. Nullam lobortis risus sed
                bibendum malesuada. Quisque arcu nunc, feugiat ac urna at,
                viverra vulputate mauris. Phasellus ex nibh, scelerisque ac
                neque ac, porta fringilla lorem. Donec pellentesque tellus ac
                vulputate tincidunt. Aliquam ut magna nisi. Nunc scelerisque
                augue at arcu tincidunt, sed accumsan ipsum porta. Nulla quis
                neque tortor. Fusce vel velit nisi. Sed interdum massa eu sapien
                mollis, sit amet volutpat velit condimentum. Morbi cursus lectus
                at rhoncus auctor. Donec a tortor non purus suscipit iaculis.
                Phasellus vel purus in leo interdum tincidunt eget et tortor.
                Donec quis dolor vel libero imperdiet molestie fermentum vel
                mauris. Etiam aliquam et dui at commodo. Sed pulvinar est eu
                arcu dignissim mollis. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Duis gravida turpis ante, quis consequat lacus
                condimentum vestibulum. Vivamus blandit mi ut nunc porta mollis.
                Nullam venenatis neque vitae erat gravida, sed suscipit diam
                varius. Duis vel arcu cursus, convallis lorem ut, accumsan
                neque. Integer ut faucibus massa, id blandit lectus. Praesent
                euismod dignissim tristique. Nunc sagittis, urna quis consequat
                blandit, enim felis ultrices erat, sed ultricies turpis odio
                cursus magna. Mauris euismod viverra est ac condimentum. Etiam
                hendrerit eros mauris, a porttitor felis volutpat efficitur.
                Nulla ante est, finibus sodales diam ac, imperdiet volutpat dui.
                Suspendisse potenti. Vestibulum sagittis at est ut porttitor. In
                interdum, arcu eget finibus sollicitudin, est diam aliquet
                mauris, vel consectetur ante nibh ac purus. Integer at blandit
                metus. Vivamus vehicula diam nisl, eget lacinia massa viverra
                sed. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Nulla ac molestie augue.
                Suspendisse at eros et arcu iaculis consequat. Aliquam urna
                purus, sagittis a scelerisque et, blandit eu arcu. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Nunc at dignissim metus, at pretium turpis.
                Sed non porta diam, et ullamcorper nisl. Curabitur ornare erat
                nisl, quis bibendum sem faucibus id. Nullam vitae dictum neque.
                Aliquam a ante a nisi condimentum varius. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. In tincidunt, magna ut
                bibendum varius, nisi leo convallis arcu, id cursus massa odio
                vitae odio. Sed imperdiet mi et nibh dapibus, vitae rutrum
                sapien pulvinar. Praesent sed purus lacinia, ultricies libero
                ut, suscipit ipsum. Pellentesque eleifend velit blandit
                elementum tincidunt. Proin molestie molestie tellus sed
                ultricies. Nulla finibus egestas dignissim. Nullam consectetur
                tellus eget felis commodo, imperdiet molestie dui tincidunt.
                Aenean sed tortor tellus. Nam ac nisi eu magna commodo
                tincidunt. Vestibulum hendrerit erat vitae egestas euismod. Sed
                porttitor felis sed dui accumsan dignissim tincidunt eu elit.
                Nulla sed nunc malesuada justo ornare varius eget dapibus dolor.
                Nulla dolor mauris, maximus non egestas eu, efficitur a ex.
                Integer nec dui risus. Nam eu augue augue. Mauris quis eros
                augue. Aliquam eget tortor sit amet ipsum gravida commodo id vel
                nisl. Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Duis neque nulla, pretium a
                euismod vitae, efficitur nec lectus. Ut nec arcu imperdiet,
                tristique erat in, congue velit. Cras elementum elementum elit
                ac mollis. Cras aliquet dolor in leo accumsan dictum. Nunc ut
                eleifend nulla, et convallis lacus. Suspendisse sed urna varius,
                egestas nibh nec, lobortis diam. Duis dapibus tellus felis, vel
                efficitur mauris posuere a. In bibendum nulla eget lectus
                convallis, at ultrices leo vehicula. Etiam ac dolor at ipsum
                dapibus fermentum. Aliquam placerat sem quam, id porta lectus
                dictum eget. Sed condimentum luctus neque, at egestas enim
                accumsan vel. Vivamus vestibulum nec elit eu dapibus. Nam nisi
                orci, euismod vel finibus sit amet, porttitor at ex. Nullam
                mollis ornare massa, id fermentum libero. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Etiam dui magna, imperdiet in
                blandit vel, consequat quis enim. Cras enim est, rutrum sit amet
                dui sed, congue vestibulum arcu. Praesent consectetur enim eu
                augue cursus, vitae facilisis tortor sagittis. Integer eget
                mattis erat, dictum feugiat eros. Etiam quis consectetur lectus,
                eu ornare diam. Aenean vitae tincidunt mi, quis ultrices massa.
                Nunc congue ligula nec diam dapibus, nec lacinia justo congue.
                Praesent ac urna ac tellus mattis malesuada sed vel sem.
                Suspendisse vitae metus nibh. Etiam ac leo id nisl placerat
                iaculis sit amet iaculis nisi. In turpis turpis, pulvinar eu
                lacus eget, fermentum sagittis dui. Proin sed consequat eros. In
                quis ligula bibendum, aliquet erat posuere, sodales risus.
                Aliquam rhoncus rutrum dui in faucibus. Sed pharetra justo enim,
                pretium interdum nibh viverra non. Nam ac tristique dolor. Ut
                rutrum finibus risus, nec semper nunc feugiat eget. Aenean sed
                arcu vel lorem euismod commodo. Praesent quis est egestas,
                egestas tortor eu, scelerisque leo. Curabitur scelerisque ante
                vitae velit elementum, sollicitudin venenatis arcu condimentum.
                Pellentesque eleifend dapibus ante a convallis. Nullam luctus
                accumsan est, id elementum dui. Ut id eros nisi. Quisque
                consequat lobortis ligula, quis malesuada diam consectetur at.
                Vivamus at placerat lectus, ac tempor urna. Pellentesque at
                tortor lorem. Vivamus ac leo sed mi lobortis faucibus et a
                risus. Cras accumsan dui consectetur diam rhoncus, sit amet
                euismod erat mattis. Nullam vel purus ac lacus varius semper.
                Etiam congue nec est a fermentum. Duis ex diam, fringilla eget
                fringilla sit amet, auctor et metus. In sed nibh fermentum,
                rhoncus metus sed, aliquet lacus. Mauris sodales lectus interdum
                dui varius, dictum pulvinar urna cursus. Cras bibendum metus
                quis lorem ornare viverra. Vivamus dapibus lobortis tellus nec
                dapibus. Nunc hendrerit leo eget porta semper. Vestibulum ut
                varius augue. Sed eget maximus diam. Vestibulum pretium felis
                accumsan gravida scelerisque. Ut ac velit sed odio blandit
                dapibus. Nam pretium nec diam quis imperdiet. Praesent facilisis
                ut lorem quis interdum. Maecenas quis iaculis libero. Mauris
                euismod, metus vitae ultricies mattis, justo massa varius justo,
                vel semper nisl augue nec velit. Suspendisse in erat orci.
                Vestibulum in felis rutrum, laoreet dolor vitae, blandit nunc.
                Sed nunc diam, scelerisque ac turpis ut, egestas maximus leo.
                Fusce bibendum viverra tristique. Maecenas et dui fermentum,
                malesuada massa a, ullamcorper urna. Proin sit amet mauris
                euismod, aliquam urna et, blandit mauris. Aliquam molestie
                sodales nisi at blandit. Quisque sit amet ultrices massa. Nulla
                tincidunt cursus mi ut fringilla. Sed eget faucibus sem.
                Curabitur volutpat sollicitudin ipsum eget tempus. Ut nec varius
                odio, at blandit velit. Proin mauris metus, interdum id massa
                vitae, viverra commodo quam. Sed sapien leo, viverra id interdum
                non, fringilla et augue. Praesent viverra metus sed mauris
                eleifend posuere. Nunc a iaculis leo. Proin et consequat leo,
                porttitor condimentum sem. Duis et fringilla augue. Cras
                pharetra lobortis porttitor. Vestibulum in dui sodales, cursus
                nibh non, aliquam dui. In finibus congue turpis, varius suscipit
                felis varius id. Nam fermentum porta ipsum ac porta. Duis
                malesuada turpis pulvinar hendrerit congue. Morbi vitae semper
                metus. Aliquam sagittis, justo sed pharetra semper, mauris leo
                varius lacus, ac eleifend libero lectus et velit. Vestibulum
                luctus elit vel lectus laoreet, vel ornare sapien dignissim.
                Etiam ornare id felis at dignissim. Nam magna ex, porta at augue
                sit amet, lacinia semper purus. Integer nec bibendum magna, nec
                fringilla nulla. Suspendisse et scelerisque nunc. Quisque tempus
                tellus eget risus feugiat ultricies. Morbi ac ultricies orci.
                Etiam dapibus lectus vel sem tincidunt, id accumsan magna
                malesuada. Etiam accumsan quis dui et imperdiet. Curabitur quis
                tellus convallis, consequat eros ac, hendrerit lectus. Duis orci
                turpis, bibendum varius massa interdum, ullamcorper semper orci.
                Nullam bibendum lacus aliquet, condimentum nulla eu, dapibus
                massa. Vestibulum fermentum ullamcorper quam, a ultrices felis
                fermentum quis. Praesent suscipit, odio nec sagittis mollis,
                odio est vestibulum nunc, non tincidunt turpis risus in leo. Sed
                tristique mi ac magna vulputate interdum. Duis ac tortor
                finibus, feugiat sapien id, cursus leo. Donec a libero accumsan,
                imperdiet lacus eu, hendrerit nisl. Nunc lacus diam, lacinia a
                posuere eu, pharetra sit amet nisi. Phasellus euismod lorem
                nibh, sit amet congue justo accumsan et. Duis hendrerit odio
                eget quam tristique, at cursus arcu accumsan. Morbi in maximus
                turpis. Ut tincidunt faucibus nisi, at pulvinar elit vehicula
                vel. Mauris nec porta turpis. Ut dolor lectus, molestie id
                ullamcorper nec, tristique et ligula. Duis pulvinar sed massa
                vitae egestas. Nunc fringilla tincidunt pharetra. Etiam
                imperdiet tellus vitae diam luctus, quis aliquam dui tincidunt.
                Donec id erat ac nibh dapibus cursus. Proin eget mauris egestas
                magna lacinia fringilla elementum eu arcu. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Vivamus sollicitudin erat
                lacus, eget sollicitudin felis fringilla vitae. Vestibulum
                eleifend ac ex vel dignissim. Cras dignissim viverra nunc ac
                facilisis. Duis hendrerit sapien vel leo rutrum, vitae blandit
                neque posuere. Nulla ut augue a metus eleifend gravida id sit
                amet sem. Fusce ante augue, iaculis non tincidunt et, volutpat
                ut justo. Praesent ante metus, dignissim non est interdum,
                efficitur feugiat nibh. Vestibulum blandit magna leo, a semper
                libero congue sit amet. Nam ac ex eu dolor maximus commodo sed
                eget libero. Quisque in tristique nulla, a pretium velit. Donec
                condimentum, sem non feugiat interdum, lectus dui consectetur
                sem, vitae accumsan erat turpis quis tortor. Sed id augue magna.
                Orci varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Duis lacus urna, volutpat in pretium
                sodales, gravida at leo. Nullam porta tempus ipsum vitae mattis.
                In ac feugiat ligula. Etiam vel pellentesque ipsum. Nunc a
                lectus sapien. Etiam id consectetur est. Curabitur sagittis
                sapien aliquam, mollis dui ut, bibendum magna. Cras interdum ex
                eu quam dapibus posuere et scelerisque justo. Aliquam nec
                pellentesque lorem. Nam ullamcorper iaculis enim, non semper dui
                fermentum at. Nulla et lacinia purus. Donec vel posuere ex, eget
                lacinia neque. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Mauris accumsan porta
                aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed sit amet facilisis ante. Suspendisse potenti. Integer
                mattis imperdiet aliquet. Nullam a ipsum orci. Orci varius
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Aliquam rhoncus non sem dapibus luctus. Phasellus
                vitae euismod odio, ac vulputate dui. Quisque feugiat dapibus
                libero, at imperdiet libero auctor in. Nullam tortor ligula,
                mollis at sollicitudin non, tincidunt at turpis. Maecenas at
                urna vestibulum, rhoncus orci nec, mollis arcu. In turpis neque,
                convallis a facilisis in, faucibus ac est. Aenean commodo erat
                sed odio porttitor semper. Quisque molestie ex eu est sodales
                lacinia. Aliquam condimentum vulputate felis vitae venenatis.
                Curabitur ullamcorper, nunc quis pulvinar porttitor, enim nisi
                consectetur nulla, in commodo ex lacus nec urna. Nunc sed
                gravida nisl. Maecenas imperdiet tempor enim, elementum tempus
                tellus congue id. Nunc ultricies nec nulla ut posuere. Praesent
                fringilla, dui vitae dapibus iaculis, sem neque porta est, id
                viverra massa est in ante. Nullam vel pulvinar ipsum, sit amet
                suscipit nisi. Curabitur mi velit, elementum at tempus ut,
                lobortis nec leo. Nullam lacinia vitae mauris facilisis
                molestie. Etiam fermentum, eros eget ultricies iaculis, quam
                erat blandit magna, sed dignissim odio velit eu sem. Nam
                vulputate blandit magna ut aliquet. Nam sed posuere ante.
                Pellentesque nec tortor eu dui faucibus dignissim. Nunc pretium
                erat non mi consectetur ultrices. Phasellus dignissim, nisl eu
                varius fermentum, nisi justo maximus sem, nec pulvinar dui nunc
                vulputate tortor. Mauris molestie dui sit amet tellus viverra,
                et suscipit libero cursus. Aenean eleifend in massa a gravida.
                Sed sit amet velit felis. Duis gravida cursus tempus. Vestibulum
                gravida luctus purus. Aenean malesuada purus id orci viverra
                ullamcorper. Nullam malesuada tincidunt odio nec mattis.
                Suspendisse mattis purus quis libero lobortis interdum. Quisque
                a dolor vel eros condimentum mollis vel in erat. Mauris pharetra
                tempor tellus, ac viverra mi mollis vel. Suspendisse id quam
                congue, egestas leo vel, semper risus. Nunc sit amet laoreet
                magna, a pharetra enim. In hac habitasse platea dictumst.
                Pellentesque condimentum nulla felis, vitae ullamcorper dui
                tempor quis. Fusce aliquam bibendum ligula eu dapibus. Vivamus
                eu rutrum justo. Nunc sed mi id purus vestibulum condimentum sed
                nec neque. Vestibulum accumsan sapien vehicula velit imperdiet,
                ut elementum ex elementum. Donec faucibus feugiat nibh, id
                tristique est dictum a. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Cras faucibus, purus et semper feugiat, ex nunc
                mattis nulla, vitae gravida lectus enim ut mi. Curabitur in
                convallis mauris. Quisque consequat nisi in sem suscipit, vel
                volutpat tortor porta. Donec eget orci orci. Integer bibendum
                eget ante quis maximus. In vel pretium quam, eu pulvinar mi. Ut
                efficitur porttitor felis, eu scelerisque massa vehicula et.
                Donec tristique semper sem. Sed volutpat nisl ac molestie
                luctus. Duis nec urna vitae turpis mollis sagittis. In
                sollicitudin libero id metus finibus posuere. Morbi justo dui,
                dapibus vel lacinia et, dignissim a mi. Morbi a porta nisl, quis
                facilisis felis. In nec auctor magna. Quisque id est nibh.
                Vestibulum scelerisque justo orci, quis imperdiet justo lobortis
                vitae. Duis at leo nibh. Quisque justo lorem, ultrices ac semper
                a, volutpat sit amet arcu. In pretium ac tellus sit amet
                imperdiet. Sed malesuada metus vitae ante vulputate, et
                fringilla enim volutpat. Ut nisl purus, sagittis ut aliquet ut,
                posuere eget ante. Ut consectetur lectus arcu, ac gravida purus
                ullamcorper vitae. Vivamus pellentesque risus id dui fringilla
                lacinia. Aenean varius risus vel dolor egestas, sit amet
                tincidunt nulla lobortis. Etiam malesuada dui at urna finibus,
                non pellentesque lacus vulputate. Quisque in purus interdum,
                tempus justo nec, pellentesque felis. Vestibulum lacus lectus,
                vehicula et sapien eget, dapibus semper ligula. Suspendisse nec
                lobortis magna. Morbi ut sodales erat. Aliquam auctor tempus
                enim, vel efficitur orci tincidunt ut. Pellentesque id
                pellentesque erat. Duis sit amet arcu eu felis ornare accumsan.
                Aliquam vitae risus quis augue venenatis tristique vitae nec
                odio. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Curabitur congue mattis consectetur. Aliquam quis dui
                mi. Maecenas cursus gravida nisi, vel rutrum augue semper nec.
                Mauris ac consequat massa. Donec tempor auctor nulla quis
                sagittis. Sed eu dolor nulla. Donec ullamcorper neque tortor.
                Vivamus ac dignissim diam. Suspendisse efficitur nunc quam.
                Quisque dignissim, tortor non commodo fermentum, risus dolor
                feugiat lorem, ac auctor sapien felis a ante. Donec eu ex
                viverra, suscipit justo eu, ultricies dolor. Quisque feugiat
                nunc non ligula tempor, id iaculis justo fermentum. Fusce lectus
                ex, imperdiet nec semper eget, aliquam id tellus. Maecenas ut
                tincidunt risus. Morbi sapien orci, feugiat id ultrices nec,
                hendrerit vulputate risus. Quisque eget luctus dolor, sed
                dignissim nunc. Praesent tincidunt luctus lorem, sed aliquam
                arcu luctus interdum. Praesent vitae mattis diam, scelerisque
                porttitor justo. Vivamus eleifend vulputate massa a ornare.
                Aliquam id consectetur tortor. Nullam accumsan blandit molestie.
                Vivamus semper tortor ac leo molestie auctor. Curabitur rutrum
                porta auctor. Morbi scelerisque diam posuere urna porta,
                tincidunt vehicula odio molestie. In blandit vulputate dui eget
                elementum. Donec purus nibh, faucibus vel erat vitae, efficitur
                commodo nunc. Sed id metus quis ante vulputate eleifend ut quis
                dui. Nullam aliquet eu massa mattis fringilla. Proin eleifend
                pharetra libero et rhoncus. Nunc molestie eleifend lobortis.
                Curabitur varius ut turpis ut ullamcorper. Suspendisse vulputate
                at nisl quis congue. Suspendisse lectus mi, dictum in interdum
                cursus, viverra ut odio. Nunc convallis sapien vel faucibus
                euismod. Suspendisse tincidunt tortor at nisl dapibus, sit amet
                iaculis dui dapibus. Duis finibus et leo a maximus. Curabitur a
                orci sit amet ex venenatis lobortis at nec mauris. Nulla sed
                magna quis odio efficitur vestibulum. Suspendisse potenti. Donec
                nec quam in massa dignissim rhoncus. Morbi consectetur molestie
                tortor at consectetur. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas.
                Pellentesque auctor maximus porttitor. Donec nec urna non lacus
                egestas bibendum. Phasellus imperdiet porttitor euismod. Nunc et
                sapien massa. Morbi vel sapien pretium, iaculis lacus sit amet,
                fringilla mauris. Maecenas tempus neque a mauris ultricies, eget
                cursus odio fermentum. Etiam lectus nibh, aliquam dictum nibh
                nec, tincidunt tristique odio. Quisque tincidunt erat sit amet
                nulla congue rutrum. Quisque efficitur tellus eu ante venenatis
                posuere. Pellentesque nec tristique magna, et interdum sem. Duis
                ultrices ex turpis, a ornare ligula maximus nec. Fusce
                ullamcorper metus at urna porta, eu lobortis neque blandit. Nam
                leo massa, maximus vel luctus ac, malesuada a massa. Nunc
                placerat mi sit amet nunc pulvinar ornare. Donec bibendum
                scelerisque velit, id varius ligula consectetur eget. Fusce
                tincidunt rutrum purus. Duis aliquet ex non ipsum condimentum
                fermentum. Quisque blandit, est quis convallis sodales, orci
                enim vulputate tortor, id laoreet lorem mauris eu massa.
                Phasellus ut pulvinar nibh. Donec sed accumsan mauris.
                Suspendisse quis lorem ipsum. Curabitur at lacus sed erat
                imperdiet fermentum. Suspendisse accumsan, leo vitae ultricies
                maximus, dui enim sagittis quam, at ultricies augue purus
                malesuada augue. Curabitur vitae mi at lacus elementum ultrices.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nec augue vitae risus pharetra rhoncus. Fusce volutpat pretium
                lorem a volutpat. Nulla facilisi. Mauris quis molestie ex. Nunc
                quam lacus, congue nec luctus id, tempus scelerisque erat. In
                tempor metus id mauris pulvinar rutrum. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Curabitur turpis dui,
                facilisis et aliquam id
              </p>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="gutter-row">
              <div id="display_ads"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_1"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_2"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_3"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_4"></div>
            </Col>
            <Col className="gutter-row">
              <div
                id="display_ads_5"
                style={{
                  position: "relative",
                }}
              >
                <video
                  id="content_video"
                  className="video-js vjs-default-skin"
                  poster="https://googleads.github.io/videojs-ima/examples/posters/bbb_poster.jpg"
                  controls
                  preload="auto"
                  width="1366"
                  height="768"
                  playsInline
                >
                  <source
                    src="//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  ></source>
                </video>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
