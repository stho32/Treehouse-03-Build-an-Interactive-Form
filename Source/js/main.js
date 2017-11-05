/**
 * The forms javascript file. 
 */

(function() {
    "use strict";

    // implementation of requirement (R2)
    function EnableJobRoleInteraction() {
        const $yourJobRoleInput = $("#your-job-role");
        const $jobTitleSelect = $("#title");

        function ShowOrHideYourJobRoleDependingOnSelection() {
            $yourJobRoleInput.toggle($jobTitleSelect.val() === "other");
        }

        // I do "not really know" the default value of the drop down
        // so I just init everything by evaluation the visibility rule.
        ShowOrHideYourJobRoleDependingOnSelection();

        // Everytime the selection of the job role changes we need to 
        // reevaluate if the visiblilty ot he job role text field makes sense.
        $jobTitleSelect.on("change", ShowOrHideYourJobRoleDependingOnSelection);
    }

    // implementation of requirement (R3)
    function EnableTShirtDesignsAndColorsInteraction() {
        const $designSelect = $("#design");
        const $colorSelect  = $("#color");

        // Add a placeholder option
        const $placeholderOption = $('<option>Please select a T-shirt theme</option>');
        $colorSelect.prepend($placeholderOption);

        function MakeColorsVisibleByDesign(design) {
            let options = $colorSelect.children();

            for (let i = 0; i < options.length; i++ ) {
                let $option = $(options[i]);

                $option.toggle($option.data("belongstoshirt") === design);
            }

            $placeholderOption.toggle(design === "Select Theme");

            /* We always select the first visible option when the theme is changed.
               As far as we know there should always be at least one.
             */
            $colorSelect.val($colorSelect.find("option:visible")[0].value);
        }

        $designSelect.on("change", () => {
            MakeColorsVisibleByDesign($designSelect.val());
        });

        MakeColorsVisibleByDesign($designSelect.val());
    }

    EnableJobRoleInteraction();
    EnableTShirtDesignsAndColorsInteraction();
})();