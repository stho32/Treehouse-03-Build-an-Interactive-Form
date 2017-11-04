# Notes


# (R1)
Added autofocus to the first text input. 
I do not know why I should need Js for this. The requirements say nothing about explicit javascript so I guess its ok. 

# (R2)
The text field "Your job role" didn't exist yet, so I copied the one with the email-Address and 
changed it a bit. 
I want to use jquery, so I downloaded it and saved it into js/vendor. 
Created new main.js.
Linked them javascript files up in the index.html.
Since the main.js is loaded at the end of the form file I do not need to use $(document).ready.

I do not want to pollute the global namespace, so I nicely encapsulate everything in an IIFE. 
This also gives me a nice position to "use strict".

# (R3)
Well well. Actually the pattern is quite similar to the first interaction.
I added data- Attributes to the options so that they know to which shirt they belong.
That can be used for filtering. 


... I should update R1 to use const references to DOM components. 
Its just a bit more beautiful :).