/* eslint-disable indent */
import React, { useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import LinkedIn from "linkedin-login-for-react";
import API from "@aws-amplify/api";

function ProfileModal(props) {
  const [loading, setLoading] = useState(false);
  async function callbackLinkedIn(error, code, redirectUri) {
    if (error) {
      // signin failed
      console.log("Error: ", error);
    } else {
      // Obtain authorization token from linkedin api
      // see https://developer.linkedin.com/docs/oauth2 for more info
      // set authenticated to true, store something in local storage?
      setLoading(true);
      let linkedInfo = await fetchLinkedInInfo(code);
      let profileInfo = await fetchProfileData(linkedInfo.profile.id);
      if (profileInfo.fName === undefined) {
        // let's create a profile if none exists
        let { pk, sk } = await fetchNewStellarCredentials();

        let body = {
          PK: "member",
          SK: linkedInfo.profile.id,
          LSI1: "seattle",
          fName: linkedInfo.profile.localizedFirstName,
          lName: linkedInfo.profile.localizedLastName,
          profilePicture:
            linkedInfo.picture.profilePicture["displayImage~"].elements[0]
              .identifiers[0].identifier,
          access_token: linkedInfo.token.access_token,
          // array of records, to track best hole score, etc.
          records: [],
          achievements: [],
          phone: "",
          bio: "",
          xp: 0,
          gcPK: pk,
          gcSK: sk,
        };
        try {
          await API.post("matches", "/sp3", { body });
          // Setting props.golfer to be the golfer that was just created, and saved in localStorage
          props.setGolfer(body);
          localStorage.setItem("golfer", JSON.stringify(body));
        } catch (e) {
          console.log("User creation error: ", e);
        }

        localStorage.setItem("authenticated", "true");
        localStorage.setItem("id", linkedInfo.profile.id);
        props.setAuthenticated(true);
        props.closeModal();
        setLoading(false);
      } else {
        // let's set our application state since we have our profile
        setLoading(false);
        props.setGolfer(profileInfo);
        localStorage.setItem("golfer", JSON.stringify(profileInfo));
        localStorage.setItem("authenticated", "true");
        props.setAuthenticated(true);
        props.closeModal();
      }
    }
  }

  async function fetchProfileData(id) {
    try {
      // PK of 'profile', SK of ID?
      let response = await API.get("matches", `/sp3/object/member/${id}`);

      return response;
    } catch (e) {
      console.log("Error fetching profile: ", e);
    }
  }

  async function fetchNewStellarCredentials() {
    let creds = await API.get("util", "/stellar-init");
    let pk = creds.keys.public;
    let sk = creds.keys.secret;
    return { sk, pk };
  }

  async function fetchLinkedInInfo(authorizationCode) {
    let link;
    process.env.NODE_ENV === "development"
      ? (link = "http://localhost:3000/")
      : (link = "https://www.seattlepar3.com/");
    try {
      let data = await API.post("util", `/auth`, {
        body: {
          authorization: authorizationCode,
          uri: link,
        },
      });
      return data;
    } catch (e) {
      console.log("OAuth LI Error: ", e);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      {loading === false ? (
        <div>
          {props.authenticated === false ? (
            <div>
              <div className="flex-between">
                <h1>Login with LinkedIn</h1>
              </div>
              <h2>Par 3 Pickup Features</h2>
              <ol
                style={{ listStyleType: "upper-roman", padding: 10, margin: 8 }}
              >
                <li className="list-style">
                  Track your golfing achievements to grow your GS (Golfer Score)
                </li>
                <li className="list-style">
                  Earn Golf Coins (GC) for each achievement, recorded on the
                  Stellar Blockchain.
                </li>
                <li className="list-style">
                  Bet Golf Coins (GC) on skins with your friends.
                </li>
              </ol>
              <div id="linkedin-connect">
                <LinkedIn
                  clientId="86ydeex4svad2m"
                  callback={callbackLinkedIn}
                  className="social-button"
                  scope={["r_liteprofile", "r_emailaddress"]}
                  text="Login With LinkedIn"
                />
              </div>
            </div>
          ) : (
            <div>
              {/* Currently disabled, could be a modal to edit profile/view information when already authenticated and loaded */}
              <div className="flex-between">
                <h1 style={{ textAlign: "center" }}>Lorem Ipsum</h1>
              </div>
              <DialogContent style={{ textAlign: "center" }}></DialogContent>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            Loading your Data
          </h2>
          <div class="cssload-thecube">
            <div class="cssload-cube cssload-c1"></div>
            <div class="cssload-cube cssload-c2"></div>
            <div class="cssload-cube cssload-c4"></div>
            <div class="cssload-cube cssload-c3"></div>
          </div>
          <br />
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p>When creating your profile, this can take 15 seconds.</p>
            <p>The Stellar Blockchain is cool, but it is slow.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileModal;
