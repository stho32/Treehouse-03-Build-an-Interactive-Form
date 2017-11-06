/**
 * The form's javascript file.
 * 
 * The rest is the interaction for the form. 
 */


(function() {
    "use strict";

    // implementation of requirement (R2) "Job Role Other"
    function EnableJobRoleInteraction() {
        const $yourJobRoleInput = $("#your-job-role");
        const $jobTitleSelect = $("#title");

        function ShowOrHideYourJobRoleDependingOnSelection() {
            $yourJobRoleInput.toggle($jobTitleSelect.val() === "other");
        }

        // Connect & Initialize interaction
        $jobTitleSelect.on("change", ShowOrHideYourJobRoleDependingOnSelection);
        ShowOrHideYourJobRoleDependingOnSelection();
    }

    // implementation of requirement (R3+R4) "Dropboxes and placeholders"
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

        // Connect & initialize interaction
        $designSelect.on("change", () => { MakeColorsVisibleByDesign($designSelect.val()); });
        MakeColorsVisibleByDesign($designSelect.val());
    }

    // implementation of requirement (R5) "Activities and timeslots"
    function EnableActivitySelectionAndTimeslots() {
        const $activityFieldset = $(".activities");
        const $activityCheckboxes = $('.activities input[type="checkbox"]');

        // Collects information about all the used timeslots.
        function UsedTimeslots() {
            let result = [];

            for (let i = 0; i < $activityCheckboxes.length; i++ ) {
                let $checkbox = $($activityCheckboxes[i]);
                let checkboxIsChecked = $checkbox.prop("checked");
                let timeslot = $checkbox.data("timeslot");
            
                if ( checkboxIsChecked ) {
                    result.push(timeslot);
                }
            }

            return result;
        }        

        function DisableActivitiesOnTimeslotsThatAreNotChecked(event) {
            // We want this handler to just run once every checkbox click/change.
            if ( event !== undefined ) event.stopPropagation();

            let usedTimeslots = UsedTimeslots();

            for (let i = 0; i < $activityCheckboxes.length; i++ ) {
                let $checkbox = $($activityCheckboxes[i]);
                let $label    = $checkbox.closest("label");

                let checkboxIsChecked = $checkbox.prop("checked");
                let timeslot = $checkbox.data("timeslot");
                
                let shouldBeDisabled = usedTimeslots.indexOf(timeslot) > -1 && !checkboxIsChecked;

                $checkbox.prop("disabled", shouldBeDisabled);
                $label.toggleClass("label--inactive", shouldBeDisabled);
            }
        }

        $activityFieldset.on("click", DisableActivitiesOnTimeslotsThatAreNotChecked);
        DisableActivitiesOnTimeslotsThatAreNotChecked();
    }

    // implementation of requirement (R6) "Activities and their costs"
    function EnableActivityCostCalculation() {
        const $activityFieldset = $(".activities");
        const $activityCheckboxes = $('.activities input[type="checkbox"]');

        // total cost html "control"
        const $totalCostControl = $(`
        <div class="totalCost">
            <span class="totalCost__label">Total:</span>
            <span class="totalCost__cost">$0</span>
        </div>
        `);
        $activityFieldset.append($totalCostControl);

        function TotalCost() {
            let result = 0;

            for (let i = 0; i < $activityCheckboxes.length; i++ ) {
                let $checkbox = $($activityCheckboxes[i]);
                let checkboxIsChecked = $checkbox.prop("checked");
                let cost = parseInt($checkbox.data("cost"), 10);
                
                if ( checkboxIsChecked ) {
                    result += cost;
                }
            }

            return result;
        }

        function UpdateTotalCost() {
            $totalCostControl.find(".totalCost__cost").text("$" + TotalCost().toString());
        }

        $activityFieldset.on("click", UpdateTotalCost);
        UpdateTotalCost();
    }

    // implementation of requirement (R7) "Show and hide payment sections"
    function EnablePaymentSectionDisplay() {
        const $paymentSelect = $("#payment");
        const options = $paymentSelect.children();

        function HideAll() {
            for (let i = 0; i < options.length; i++) {
                $("." + $(options[i]).data("connectedtocssclass")).hide();
            }
        }

        function ShowSelectedPaymentSection() {
            HideAll();

            let selectedOption = $paymentSelect.find("option:selected");
            let cssClass = "." + $(selectedOption).data("connectedtocssclass");

            $(cssClass).show();
        }

        $paymentSelect.on("change", ShowSelectedPaymentSection);
        ShowSelectedPaymentSection();
    }

    EnableJobRoleInteraction();
    EnableTShirtDesignsAndColorsInteraction();
    EnableActivitySelectionAndTimeslots();
    EnableActivityCostCalculation();
    EnablePaymentSectionDisplay();
})();