Vue.use(VueCleave);

var app = new Vue({
    // the element to apply the code to
    el: '#app',
    //define the variables
    data: {
        email: '',
        occupation: '',
        industry: '',
        salary: '',
        years: '',
        finish: '',
        start: '',
        yeslunch: '',
        nolunch: '',
        working_days: 230,
        total_days: 260,
        working_hours: 8,
        button_text: 'Submit',
        calculated: false,
        unpaid_overtime: '',

    },
    watch: {
        total_unpaid_overtime: function () {

        },

    },


    methods: {

        // returns unpaid overtime
        total_unpaid_overtime: function () {
            newStart2 = this.start.split('')
            newFinish2 = this.finish.split('')


            newStart = this.start.split(':')
            newFinish = this.finish.split(':')
            console.log(newFinish2[5]);
            console.log(newFinish2[4]);

            if (newFinish2[5] == "p" || newFinish2[4] == "p") {
                bestFinish = newFinish[0] + 12;

            } else {
                bestFinish = newFinish[0];
                console.log(bestFinish);
            }

            if (newStart2[5] == "p" || newStart2[4] == "p") {
                bestStart = newStart[0] + 12;

            } else {
                bestStart = newStart[0];
                console.log(bestStart);
            }




            console.log(newStart2);
            console.log(newFinish2);

            if (this.nolunch === "nolunch") {
                this.working_hours = 7.5;
            } else {
                this.working_hours = 8;
            }

            newTime = (bestFinish - bestStart) - this.working_hours


            totalOvertime = newTime * 230
            salaryDay = this.salary / 260
            salaryHour = salaryDay / 8.0
            result = totalOvertime * salaryHour


            return Math.ceil(result)
        },

        // returns unpaid overtime
        total_hours_overtime: function () {
            newStart = this.start.split(':')
            newFinish = this.finish.split(':')

            if (this.nolunch === "nolunch") {
                this.working_hours = 7.5;
            } else {
                this.working_hours = 8;
            }

            newTime = (newFinish[0] - newStart[0]) - this.working_hours


            totalOvertime = newTime * 230

            return totalOvertime
        },


        submitForm: function () {

            //show loading animation
            this.button_text =
                '<i style="color:white; font-size: 1.1em;" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';

            var formData = {
                "person": {

                    "email_addresses": [{
                        "address": this.email,
                    }],

                    "custom_fields": {
                        "Industry": this.industry,
                        "Occupation/Role": this.occupation,
                        "Salary": this.salary,
                        "Retire": this.retire


                    },

                },


                "triggers": {
                    "autoresponse": {
                        "enabled": true
                    }

                },

                "add_tags": [
                    "C: Save Super",
                    "I: Superannuation",
                    "A: Calculator"

                ]

            };


            axios.post(
                'https://actionnetwork.org/api/v2/forms/3b7e6aba-b5b9-4d3f-a29d-f7c65d934441/submissions',
                formData, {

                }).then(data => {
                this.calculated = true;
                console.log(data);
                this.button_text = 'Submit';
            })



        },


        // makes sure input is a number
        // isNumber: function (evt) {
        //     evt = (evt) ? evt : window.event;
        //     var charCode = (evt.which) ? evt.which : evt.keyCode;
        //     if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        //         evt.preventDefault();;
        //     } else {
        //         return true;
        //     }
        // },

        // only shows the result if the years and salary have been entered
        // showHide: function () {
        //     if (this.salary > 0 && this.years > 0) {
        //         this.calculated = true;
        //     } else {
        //         this.calculated = false;
        //     }
        // },






    },


});