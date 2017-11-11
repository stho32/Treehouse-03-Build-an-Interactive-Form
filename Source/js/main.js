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

    // implementation of requirement (R8) "Form Validation"
    function EnableFormValidation() {
        const $form = $("form");
        const rules = [];
        const validationControls = [];

        function AppendValidationControlFor(selector) {
            const newControlInfo = { for: selector, name: '#validationControl_' + (validationControls.length+1).toString() };
            
            let $control = $('<div id="' + newControlInfo.name + '" class="validationControl"></div>');
            $control.insertAfter($(selector));
            newControlInfo.$control = $control;

            validationControls.push(newControlInfo);
        }

        function ShowValidationMessage(forSelector, message) {
            for (let i = 0; i < validationControls.length; i++) {
                if ( validationControls[i].for === forSelector ) {
                    validationControls[i].$control.text(message);
                }
            }
        }

        function IsFormValid() {
            $(".validationControl").html("");
            
            let result = true;

            for (let i = 0; i < rules.length; i++) {
                let evaluatedRule = rules[i]();

                if (evaluatedRule.for !== undefined) {
                    ShowValidationMessage(evaluatedRule.for, evaluatedRule.message);
                    result = false;
                }
            }

            return result;
        }

        AppendValidationControlFor("#name");

        // R8.1 Name field isn’t blank
        rules.push(() => {
            if ( $("#name").val() === "" ) { return { for: "#name", message: "The name field shoudn't be blank." } }
            return {};
        });

        // When the form is submitted, then we first want to check if all rules apply.
        $form.on("submit", (event) => {
            if (!IsFormValid()) {
                event.preventDefault();
            }
        });
    }

    EnableJobRoleInteraction();
    EnableTShirtDesignsAndColorsInteraction();
    EnableActivitySelectionAndTimeslots();
    EnableActivityCostCalculation();
    EnablePaymentSectionDisplay();
    EnableFormValidation();
})();