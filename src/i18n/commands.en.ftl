-project-name = 'Watch Web Resources' Bot

start = 
  Welcome, {$name}, to the {-project-name}! This Bot sends a Telegram notification when a Web Resource being monitored has changed since last time. Send /help for a list of available commands. 

help = 
  These are the available commands :
   /start : initialize the Bot and show a Welcome message & Bot description
   /help : show this help message
   /list : lists all We Resources being monitored
   /add <Web Resource> : adds a Web Resource to be monitored
   /del <Web Resource Number> : deletes the monitoring of the Web resource specified by its number
   /test <Web Resource> :  test a Web resource for its Content-Type and checksum

add =
  Send URL to add

list =
  <Not used ? - To be deleted>

del =
  Clic on the button with the n° of the URL to delete

test =
  Send URL to test