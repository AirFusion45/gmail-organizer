function myFunction() {
  var threads = GmailApp.search("label:all") //Find all emails - this will cover most of your emails, and the stuff below is just to make sure.

  threads.push(GmailApp.getInboxThreads());
  threads.push(GmailApp.search('category:promotions'));// check the category Gmail added to the thread
  threads.push(GmailApp.search('category:forums'));// check the category Gmail added to the thread
  threads.push(GmailApp.search('category:updates'));// check the category Gmail added to the thread
  threads.push(GmailApp.search('category:social'));// check the category Gmail added to the thread
  threads.push(GmailApp.search('category:primary'));// check the category Gmail added to the thread
  threads.push(GmailApp.search('has:nouserlabels -in:Sent -in:Chat -in:Draft -in:Inbox'));// check the category Gmail added to the thread 
  var allLabels = GmailApp.getUserLabels();
  var L = allLabels.length;

  for (i = 0; i < L; i++) {
    Logger.log("label: " + allLabels[i].getName());
    var thisLabel = allLabels[i];
    threads.push(thisLabel.getThreads());
  }
  Logger.log("500: " + threads[499])

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

      //Place first run code here.
      if (messages[j].getSubject().toLowerCase().indexOf("receipt") != -1 || messages[j].getSubject().toLowerCase().indexOf("statement") != -1 || messages[j].getSubject().toLowerCase().indexOf("invoice") != -1 || messages[j].getSubject().toLowerCase().indexOf("refund") != -1 || messages[j].getSubject().toLowerCase().indexOf("authroized a payment") != -1 || messages[j].getSubject.toLowerCase().indexOf("outpayment") != -1 || (messages[j].getSubject().toLowerCase.indexOf("order") != -1 && messages[j].getFrom() === "stremail@microsoft.com") || (messages[j].getSubject().toLowerCase.indexOf("order") != -1 && messages[j].getFrom() === "googlestore-noreply@google.com")) {
        var labelGmail = GmailApp.getUserLabelByName("Organization/Bills & Receipts");
        threads[i].addLabel(labelGmail);
      }
      else if (messages[j].getSubject().toLowerCase().indexOf("ups update") != -1 || messages[j].getSubject().toLowerCase().indexOf("ups ship notification") != -1 || messages[j].getSubject().toLowerCase().indexOf("your ups package was delivered") != -1 || messages[j].getFrom() === "mcinfo@ups.com" || (messages[j].getSubject().toLowerCase().indexOf("shipped") != -1 && messages[j].getFrom() === "googlestore-noreply@google.com") || messages[j].getSubject().toLowerCase().indexOf("shipment") != -1) {
        var labelUPS = GmailApp.getUserLabelByName("Organization/Shipping Notifications");
        threads[i].addLabel(labelUPS);
      }

    }

  }
}
