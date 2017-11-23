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

# (R3)/ (R4)
Well well. Actually the pattern is quite similar to the first interaction.
I added data- Attributes to the options so that they know to which shirt they belong.
That can be used for filtering. 

R3 is clearly a description of a javascript interaction, isn't it. So I think the placeholder should not be 
there. To set me up for the right decision, I reviewed the requirement video that shows the interaction that
"the customer" wishes for. 

Updating index.html...
  - "Your job role" is not a labeled field but a text field with a placeholder
  - The drop down with the colors does not contain the "placeholder" in a hardcoded fashion.

# (R5)
First I need data for all the checkboxes that I can use. Since I use 
jQuery I'll append data- attributes to alle checkboxes and get it from there. 




# Questions for later
  - should the placeholder "Select Theme" disappear once a Theme is selected?
  - maybe it would be more awesome if the activities would get sorted/grouped by their timeslot. For users, so they can see more clearly what exactly happens.
  - selecting activities one always gets selections on the label text. we should block that...
  - When "Other" is selected as a job role then you should be forced to type a description into the then visible text field. 