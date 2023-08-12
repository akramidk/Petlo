<script lang="ts">
    import {Requests} from "$lib/utils"
    import type {DevEnv, Method} from "$lib/utils"

    export let data: any
    export let method: Method
    export let actionName: string
    export let devEnvironemt: DevEnv = "dev"

    let buttonTitle = "Submit"

    async function sendRequest() {
    console.log("data", data)
    console.log("method", method)
    console.log("actionName", actionName)
    console.log("dev env", devEnvironemt)
        buttonTitle = "Sending..."
        await Requests.makeAuthRequest(devEnvironemt, method, actionName, data, {}, {
            "Content-Type": "application/json"
        })
        .then(resp => {
            if (resp.ok) buttonTitle = "Done 👍"
        })
        .catch(err => {
            console.error(err)
            buttonTitle = "Something went wrong"
        })

        setTimeout(() => {
            buttonTitle = "Submit"
        }, 2000);
    }
</script>

<div class="block my-5">
    <select class="select select-bordered w-full max-w-xs" bind:value={devEnvironemt}>
      <option disabled>Request enviroment</option>
      <option selected value="dev">Development</option>
      <option value="prod">Production</option>
    </select>

    <button class="btn" on:click={sendRequest}>{buttonTitle}</button>
</div>
