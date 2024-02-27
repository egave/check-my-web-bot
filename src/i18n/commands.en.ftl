-project-name = 'Check-My-Web' Bot

start = 
  Welcome, {$name}, to the {-project-name}! 
  
  This Bot lets you configure the checks to be made against Web Resources and sends a Telegram notification when a Web Resource being monitored fails the check to be performed. 
  
  Send /help for a list of available commands. 

help = 
  These are the available commands :
  /start : initialize the Bot and show a Welcome message & Bot description
  /help : show this help message
  /list : lists all We Resources being monitored
  /add <Web Resource> : adds a Web Resource to monitor
    The following checks can be performed :
    - CHECK-STATUS : fails if http status != 200
    - CHECK-MD5 : fails if MD5 changes since last check
    - CHECK-WORD-HIT : fails if checked 'word' is not present in the body of the http result
    - CHECK-WORD-MISS : fails if checked 'word' is present in the body of the http result  
  /del <Web Resource Number> : deletes the monitoring of the Web resource specified by its number
  /test <Web Resource> :  test a Web resource for its Content-Type and checksum
  /donate : buy a coffee for the app's creator hard work 🙏

add =
  Send URL to add

list =
  <Not used ? - To be deleted>

del =
  Clic on the button with the n° of the URL to delete

donate =
  I hope you're enjoying this application!

  For all your feedback, suggestions for improvements, or to report a bug, contact @{$dev_username}.

  And if you'd like to thank me for my long hours of work, you can make a donation via <b><a href='{$link}'>{$text}</a></b> 🙏

test =
  Send URL to test