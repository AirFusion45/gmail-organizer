function myFunction() {
  var threads = GmailApp.search('newer_than:7d in:anywhere')

  for (var i = 0; i < threads.length; i++) {
    Logger.log("I: " + i)
    Logger.log("LEN: " + threads.length);

    try {
      var messages = threads[i].getMessages();
    } catch (err) {
      Logger.log("ERROR" + err);

      Logger.log(threads[i])

      i++;
    }

    for (var j = 0; j < messages.length; j++) {
      if (messages[j].getSubject().toLowerCase().indexOf("receipt") != -1 || messages[j].getSubject().toLowerCase().indexOf("statement") != -1 || messages[j].getSubject().toLowerCase().indexOf("invoice") != -1 || messages[j].getSubject().toLowerCase().indexOf("refund") != -1 || messages[j].getSubject().toLowerCase().indexOf("authroized a payment") != -1 || messages[j].getSubject.toLowerCase().indexOf("outpayment") != -1 || (messages[j].getSubject().toLowerCase.indexOf("order") != -1 && messages[j].getFrom() === "stremail@microsoft.com") || (messages[j].getSubject().toLowerCase.indexOf("order") != -1 && messages[j].getFrom() === "googlestore-noreply@google.com")) {
        var labelGmail = GmailApp.getUserLabelByName("Organization/Bills & Receipts");
        threads[i].addLabel(labelGmail);
      }
      else if (messages[j].getFrom() === "no-reply-aws@amazon.com" || messages[j].getFrom() === "aws-marketing-email-replies@amazon.com" || messages[j].getSubject().toLowerCase().indexOf("aws") != -1) {
        var labelAWS = GmailApp.getUserLabelByName("Organization/Amazon AWS");
        threads[i].addLabel(labelAWS);
      }
      else if (messages[j].getFrom() === "newsletter@fr24.com" || messages[j].getSubject().toLowerCase().indexOf("on the radar") != -1 || messages[j].getFrom() === "support-newsletter@flightaware.com" || messages[j].getSubject().toLowerCase().indexOf("flightaware") != -1 || messages[j].getFrom() === "team@foreflight.com") {
        var labelRadar = GmailApp.getUserLabelByName("Organization/Aviation");
        threads[i].addLabel(labelRadar);
      }
      else if (messages[j].getSubject().toLowerCase().indexOf("confirmation") != -1 || messages[j].getSubject().toLowerCase().indexOf("confirm") != -1 || messages[j].getSubject().toLowerCase().indexOf("confirmed") != -1 || messages[j].getSubject().toLowerCase().indexOf("reservation") != -1) {
        if (messages[j].getSubject().toLowerCase().indexOf("confirm your email") != -1 || messages[j].getSubject().toLowerCase().indexOf("confirm jfang.cv.ca.us@gmail.com") != -1) {

        } else {
          var labelConfirm = GmailApp.getUserLabelByName("Organization/Confirmations & Reservations");
          threads[i].addLabel(labelConfirm);
        }
      }
      else if (messages[j].getSubject().toLowerCase().indexOf("support") != -1 || messages[j].getFrom() === "support@ubnt.com" || messages[j].getFrom() === "support@discordapp.com" || messages[j].getSubject().toLowerCase().indexOf("chat transcript") != -1 || messages[j].getFrom() === "CS3TS.GNRL.WW.00.EN.STR.MOA.TS.1FL.ADK.SG.CH@css.one.microsoft.com") {
        var labelSupport = GmailApp.getUserLabelByName("Organization/Support Threads");
        threads[i].addLabel(labelSupport);
      }
      else if (messages[j].getSubject().toLowerCase().indexOf("ups update") != -1 || messages[j].getSubject().toLowerCase().indexOf("ups ship notification") != -1 || messages[j].getSubject().toLowerCase().indexOf("your ups package was delivered") != -1 || messages[j].getFrom() === "mcinfo@ups.com" || (messages[j].getSubject().toLowerCase().indexOf("shipped") != -1 && messages[j].getFrom() === "googlestore-noreply@google.com") || messages[j].getSubject().toLowerCase().indexOf("shipment") != -1) {
        var labelUPS = GmailApp.getUserLabelByName("Organization/Shipping Notifications");
        threads[i].addLabel(labelUPS);
      }
      Logger.log("Success")
    }

  }

}