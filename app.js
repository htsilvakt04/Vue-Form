window.Event = new Vue();

class Errors {
	constructor () {
		this.errors = {}
	}

	get(field) {
		if (this.errors[field]) {
			return this.errors[field][0];
		}
		return '';
	}

	record(errors) {
		this.errors = errors;
	}
	clear(field) {
		delete this.errors[field];
	}
	has (field) {
		return this.errors.hasOwnProperty(field);
	}
	hasAny() {
		return (Object.keys(this.errors).length) ? true : false;
	}
}

class Form {
	constructor (data) {

		for (let field in data) {
			this[field] = data[field];
		}
		this.errors = new Errors()
	}

	reset() {
		let properties = Object.keys(this);
		for (let field in properties) {
			if(properties[field] == 'errors') {continue;}
			this[properties[field]] = '';
		}
	}

	data () {
		let data = Object.assign({}, this);
		delete data.errors;
		return data;
	}

	submit(requestType, url) {
		return new Promise ((resolve, reject) => {

			axios[requestType](url, this.data())
			.then(response => {
				this.onSuccess(response.data);
				resolve(response.data);
			})
		  	.catch(error => {
		  		this.onFail(error.response.data)
		  		reject(error.response.data);
		  	})

		})
		
	}

	post(url) {
		return this.submit('post', url);
	}

	delete(url) {
		return this.submit('delete', url);
	}

	onSuccess(data) {
		alert(data.message);
		this.reset();
	}

	onFail(errors) {
		this.errors.record(errors);
	}


}



Vue.component('project-list',{
	template: `
		<ul>
			<li v-for="project in projects" v-text="project.name"></li>
		</ul>
	`,
	data () {
		return {
			projects: {}
		}
	},
	created() {
		axios.get('/api.projects').then(response => {
			this.projects = response.data;
		}).catch(error => {
			Event.$emit('failToRetrieveData', error.response.data);
		});
	}
})

const app = new Vue({
	el: "#app",
	data: {
		form: new Form({
			name: '',
			description: ''
		})
	},
	methods: {
		onSubmit() {
			this.form.post('/projects')
				.then(data => alert("Yup, handling it"))
				.catch(error => alert(error.message))
		}
	},
	mounted() {
		Event.$on('failToRetrieveData', function (data) {
			console.log(data);
			alert("something went wrong bro..");
		})
	}
})