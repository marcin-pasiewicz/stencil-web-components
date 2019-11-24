import {Component, Prop, State, h, Method} from '@stencil/core'

@Component({
  tag: 'mp-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop({reflect: true}) title: string;
  @Prop({reflect: true, mutable: true}) opened: boolean;

  onCloseDrawer = () => {
    if (this.opened) {
      this.opened = false
    }
  };

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact'
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot/>;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contanct information</h2>
          <p>You can reach us by phone or email.</p>
          <ul>
            <li>Phone: 1234567890</li>
            <li>E-mail: <a href="somethins@something.com">somethins@something.com</a></li>
          </ul>
        </div>
      )
    }
    return [
      <div class="backdrop"></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
          >
            Navigation
          </button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}>
            Contact
          </button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    ]
  }
}
