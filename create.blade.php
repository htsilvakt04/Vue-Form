<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css">
        <style>
            body {
                padding-top: 2rem;
            }
        </style>
        <title>Silva</title>
    </head>
    <body>
        <div id="app" class="container">
            <project-list></project-list>
            <hr>
           <form action="/projects" method="post" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                {{csrf_field()}}
                <div class="field">
                  <label class="label">Project Name</label>
                  <p class="control">
                    <input name="name" class="input" type="text" placeholder="Your project" v-model="form.name">
                  </p>
                   <p class="help is-danger" v-text="form.errors.get('name')" v-if="form.errors.has('name')"></p>
                </div>
                <div class="field">
                  <label class="label">Project Description</label>
                  <p class="control">
                    <input name="description" class="input" type="text" placeholder="" v-model="form.description">
                  </p>
                  <p class="help is-danger" v-text="form.errors.get('description')" v-if="form.errors.has('description')"></p>
                </div>
                <div class="field">
                    <p class="control">
                        <button name="submit" class="button is-primary" type="submit" :disabled="form.errors.hasAny()">Create</button>
                    </p>
                </div>
           </form>
            
            
    
        </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
