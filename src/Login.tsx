import React, { Component } from 'react';
import { TextInput } from './TextInput';
import { proxy } from "./Proxy";

export class Login extends Component {
    state = { email: "", password: "", displayName: "", register: false };
    textInput = React.createRef<TextInput>();

    render() {
        return (
            <div className="login">
                <img src="logo512.png" width="256" />

                <TextInput type="email" placeholder="Email (someone@example.com)"
                    value={this.state.email}
                    onEnter={() => this.onClick()}
                    autofocus={true}
                    onChange={e => {
                        if (e === "VFV9W6") {
                            this.setState({ displayName: "Lajos" }, function (this: Login) {
                            // console.log(this.state.displayName);
                            this.textInput.current?.setState({ value: this.state.displayName });
                            });
                        }

                        this.setState({ email: e })
                    }}
                />

                <TextInput type="password" placeholder="Password" value={this.state.password}
                    onChange={p => this.setState({ password: p })}
                    onEnter={() => this.onClick()}
                />

                {this.state.register &&
                    <TextInput type="text" placeholder="Display Name (Agent Smith)"
                        ref={this.textInput}
                        value={this.state.displayName}
                        // key={this.state.displayName} // Ez nem jo, elveszi a focust valamiert
                        onChange={e => this.setState({ displayName: e })}
                        onEnter={() => this.onClick()}
                    />
                }

                <p>
                    <button type="button" onClick={() => this.onClick()}>
                        {this.state.register ? "Register" : "Login"}
                    </button>
                </p>

                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>

                <p>{this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.setState(state => ({ register: !this.state.register })); // pass a function instead of object
                    }}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p>

            </div>);
    }

    onClick() {
        if (this.state.register)
            proxy.sendPacket({
                type: "register", email: this.state.email, password: this.state.password,
                displayName: this.state.displayName, staySignedIn: false
            });
        else
            proxy.sendPacket({
                type: "login", email: this.state.email, password: this.state.password,
                staySignedIn: false
            });
    }


}
