import { Container, injectable, inject } from "inversify";

let Symbols = {
    Ninja: Symbol.for("Ninja"),
    Katana: Symbol.for("Katana"),
    Shuriken: Symbol.for("Shuriken"),
    NinjaName: Symbol.for("NinjaName"),
};

export const container = new Container();

@injectable()
class Katana implements Katana {
    constructor() {
        console.log("Katana constructor");
    }

    public hit() {
        return "cuts!";
    }
}

@injectable()
class Shuriken implements Shuriken {
    constructor() {
        console.log("Shuriken constructor");
    }

    public throw() {
        return "hits!";
    }
}

@injectable()
class Ninja {
    @inject(Symbols.Katana) _katana!: Katana;
    @inject(Symbols.Shuriken) _shuriken!: Shuriken;
    @inject(Symbols.NinjaName) _name!: string;

    constructor(){
        console.log(this._name + " init");
        
    }
    

    public fight() {
        return `${this._name} ${this._katana.hit()}`;
    }
    public sneak() {
        return `${this._name} ${this._shuriken.throw()}`;
    }
}

container.bind<Ninja>(Symbols.Ninja).to(Ninja).inRequestScope();
container.bind<Katana>(Symbols.Katana).to(Katana).inSingletonScope();
container.bind<Shuriken>(Symbols.Shuriken).to(Shuriken).inSingletonScope();
container.bind<string>(Symbols.NinjaName).toConstantValue("Vadim");

const ninja1 = container.get<Ninja>(Symbols.Ninja);
const ninja2 = container.get<Ninja>(Symbols.Ninja);

console.log(ninja1.fight());
console.log(ninja2.fight());
