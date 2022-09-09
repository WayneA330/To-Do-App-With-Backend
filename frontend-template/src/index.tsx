import { Workbox } from "workbox-window";
import("./bootstrap");

if ("serviceWorker" in navigator) {
  const wb = new Workbox("service-worker.js");

  // wb.addEventListener("installed", (event) => {
  //   if (event.isUpdate) {
  //     window.location.reload();
  //   }
  // });

  wb.register()
    .then((register) => {
      register?.addEventListener("updatefound", (event) => {
        console.log({ event: "updatefound" });
        register.update();
        window.location.reload();
      });
    })
    .catch((registrationError) => {
      console.log("SW registration failed: ", registrationError);
    });
}
