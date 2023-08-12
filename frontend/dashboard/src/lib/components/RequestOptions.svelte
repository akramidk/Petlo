<script lang="ts">
    import {Requests} from "$lib/utils"
    import type {DevEnv, Method} from "$lib/utils"

    export let data: any
    export let method: Method
    export let actionName: string
    let devEnvironemt: DevEnv = "dev"


    async function sendRequest() {
    console.log("data", data)
    console.log("method", method)
    console.log("actionName", actionName)
    console.log("dev env", devEnvironemt)
        await Requests.makeAuthRequest(devEnvironemt, method, actionName, data, {}, {
            "Content-Type": "application/json"
        })
        .then(resp => {
            console.log(resp)
        })
        .catch(err => {
            console.error(err)
        })
    }
</script>

<div class="block my-5">
    <select class="select select-bordered w-full max-w-xs" bind:value={devEnvironemt}>
      <option disabled>Request enviroment</option>
      <option selected value="dev">Development</option>
      <option value="prod">Production</option>
    </select>

    <button class="btn" on:click={sendRequest}>Submit</button>
</div>
