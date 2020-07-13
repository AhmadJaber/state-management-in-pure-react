# `setState()`, Patterns & AntiPatterns

### Things I should do / shouldn't do, predominantly not do with state management.

##### Topics,

a. one thing we need to remember -> When we are working with props we have `propTypes`.
	 That's not the case with state. If we use `ts` or `flow` we don't have to think about that.

b. should we keep something in actual react-state?

```js
function shouldIKeepSomethingInReactState() {
	if(canICalculateFromProps()) {
		// Don't duplicate data from props in state
		// Calculate what u can in render method

		return false;
	}
	if(!amIUsingItOnRenderMethod) {
		// Don't keep something on state, if you don't use it for rendering
		// For Example, API Subscriptions are better off as custom private fields.
		// or variables in external modules.

		return false;
	}

	// You can use state
	return true;
}
```

c. Don't use `this.state` for derivations of props.

```js
class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: props.firstName + ' ' + props.lastName;
		}
	}
}
```
Problem is same component can be re-use else where with different props.
Since it is happening in the constructor, this won't be recalculated, you will
still have the old fullName.

Statement "c" solution
```js
class User extends Component {
	render() {
		const {firstName, lastName} = this.props;
		const fullName = firstName + ' ' + lastName;
		return (
			<h1>{fullName}</h1>
		)
	}
}
```
so, now when the props change, the component will re-render & we will get the updated `fullName`.

or another syntax,
```js
class User extends Component {
	get fullname() {
		const {firstName, lastName} = this.props;
		return firstName + ' ' + lastName;
	}
	// "get" keyword, let me call the function like a property withot "()"
	// Like -> this.fullName instead of this.fullName()

	render() {
		return (
			<h1>{this.fullName}</h1>
		)
	}
}
```
d. I don't need to shove everything into my `render()` method.
   i can break things out in helper-methods.
```js
class UserList extends Component {
	render() {
		const { users } = this.props;
		return (
			<section>
				<VeryImportantUserControls />
				{
					users.map(user => (
					<UserProfile
						key={user.id}
						photograph={user.mugshot}
						onLayoff={handleLayoff}
					/>
					))
				}
				<SomeSpecialFooter !/>
			</section>
		);
	}
}

// instead of doing above,
// this is more performat
class UserList extends Component {
	// We can put this method outside of the component, if needed.
	renderUserProfile(user) {
		return (
			<UserProfile
				key={user.id}
				photograph={user.mugshot}
				onLayoff={handleLayoff}
			/>
		)
	}

	render() {
		const { users } = this.props;
		return (
			<section>
				<VeryImportantUserControls />
				{ users.map(this.renderUserProfile) }
				<SomeSpecialFooter !/>
			</section>
		);
	}
}
```

e. Don't use state for things you are not going to render.
```js
// Here we want to hold on to the web-socket connection, which doing something in interVal
// We want to hold onto the state when componentWillUnmount, to clear the `setInterval()`
class TweetStream extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tweets: [],
			tweetChecker: setInterval(() => {
				Api.getAll('/api/tweets').then(newTweets => {
					const { tweets } = this.state;
					this.setState({ tweets: [ !!...tweets, newTweets ] });
				});
			}, 10000)
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.tweetChecker);
	}

	render() {// do stuff}
}

// Above process is not a good pattern at all
class TweetStream extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tweets: []
		}
	}

	componentWillMount() {
		this.tweetChecker = setInterval(() => {
			Api.getAll('/api/tweets').then(newTweets => {
				const { tweets } = this.state;
				this.setState({ tweets: [ !!...tweets, newTweets ] });
			});
		}, 10000)
	}

	componentWillUnmount() {
		clearInterval(this.tweetChecker);
	}

	render() {// do stuff}
}
```
f. Use sensible default, when assigning a state property
```js
this.state: {
	tweets: []
}

g. Not many reason to use `static getDerivedStateFromProps`
```