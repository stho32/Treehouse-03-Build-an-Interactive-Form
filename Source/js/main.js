/**
 * The forms javascript file. 
 */

(function() {
    "use strict";

    // implementation of requirement (R2)
    function EnableJobRoleInteraction() {
        function SetYourJobRoleVisibility(showIt) {
            if (showIt) {
                $("label[for='your-job-role']").show();
                $("#your-job-role").show();
                return;
            }
            $("label[for='your-job-role']").hide();
            $("#your-job-role").hide();
        }

        function ShowOrHideYourJobRoleDependingOnSelection() {
            SetYourJobRoleVisibility($("#title").val() === "other")
        }

        // I do "not really know" the default value of the drop down
        // so I just init everything by evaluation the visibility rule.
        ShowOrHideYourJobRoleDependingOnSelection();

        // Everytime the selection of the job role changes we need to 
        // reevaluate if the visiblilty ot he job role text field makes sense.
        $("#title").on("change", ShowOrHideYourJobRoleDependingOnSelection);
    }

    // implementation of requirement (R3)
    function EnableTShirtDesignsAndColorsInteraction() {
        const $designSelect = $("#design");
        const $colorSelect  = $("#color");
        
        function MakeColorsVisibleByDesign(design) {
            let options = $colorSelect.children();

            for (let i = 0; i < options.length; i++ ) {
                let option = $(options[i]);

                if ( option.data("belongstoshirt") === design ) {
                    option.show();
                }
                else
                {
                    option.hide();
                }
            }

            $colorSelect.val("");
        }

        MakeColorsVisibleByDesign(undefined);

        $designSelect.on("change", () => {
            MakeColorsVisibleByDesign($designSelect.val());
        });
    }

    EnableJobRoleInteraction();
    EnableTShirtDesignsAndColorsInteraction();
})();