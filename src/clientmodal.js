class Modal {
    get Node() { return this._obj; }
    get Classes() { return this._classes; }
    get OnAccepts() { return this._onaccepts; }
    get Dialog() { return this._obj.getElementsByClassName(this._classes.dialog)[0];}

    constructor(modalNode, classes = {
        close: "modal-close",
        accept: "modal-accept",
        container: "modal-container",
        dialog: "modal-dialog"
    }) {
        this._obj = modalNode;
        this._classes = classes;
        this._onaccepts = [];

        this.init();
    }

    init() {
        let self = this;
        this._obj.addEventListener("click", (ev) => {
            if(ev.classList.contains(self._classes.container))
                self.close();
        });

        let closers = this._obj.getElementsByClassName(this._classes.close);
        for (let i = 0; i < closers.length; i++) {
            const closer = closers[i];
            closer.addEventListener("click", () => {
                self.close();
            });
        }

        let acceptors = this._obj.getElementsByClassName(this._classes.close);
        for (let i = 0; i < acceptors.length; i++) {
            const acceptor = acceptors[i];
            acceptor.addEventListener("click", () => {
                self.accept(acceptor);
            });
        }
    }

    open() {
        this._obj.setAttribute("hidden", "");
    }

    close() {
        this._obj.removeAttribute("hidden");
    }

    accept(node) {
        for (let i = 0; i < this._onaccepts.length; i++) {
            this._onaccepts[i](this, node);
        }
    }

    addActivator(node) {
        let self = this;
        node.addEventListener("click", () => {
            self.open();
        });
    }

    addActivators(arr) {
        let self = this;
        for (let i = 0; i < arr.length; i++) {
            const node = arr[i];
            node.addEventListener("click", () => {
                self.open();
            });
        }
    }

    addClose(node) {
        let self = this;
        node.addEventListener("click", () => {
            self.close();
        });
    }

    addAcceptor(node) {
        let self = this;
        node.addEventListener("click", () => {
            self.accept(node);
        });
    }

    onAccept(callback) {
        this._onaccepts.push(callback);
    }
}