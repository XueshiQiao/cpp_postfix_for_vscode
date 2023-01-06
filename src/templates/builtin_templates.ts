import { ComplectionTemplate } from "../container"
import { IPostfixTemplate } from "../template"
import { BaseTemplate } from "./baseTemplate"


@ComplectionTemplate(
    // C++
    { name: "include \"\"", description: "", body: "#include \"{{expr}}\"$0", mode: "line"},
    { name: "include <>", description: "", body: "#include <{{expr}}>$0", mode: "line"},

    { name: "fori", description: "", body: "for (auto i = 0; i < {{expr}}; i++) {\n{{indent}}$0\n}", mode: "line"},
    { name: "for_each", description: "", body: "for (auto&$1 $2 : {{expr}}) {\n{{indent}}$0\n}", mode: "word"},
    { name: "if", description: "", body: "if ({{expr}}) {\n{{indent}}$0\n}", mode: "line"},
    { name: "not", description: "", body: "!{{expr}}", mode: "word" },

    { name: "return", description: "", body: "return {{expr}};", mode: "line" },

    { name: "auto", description: "", body: "auto $1 = {{expr}}$0", mode: "line"},
    { name: "var", description: "", body: "$1 $2 = {{expr}}$0", mode: "line"},

    { name: "sharedptr", description: "", body: "std::shared_ptr<{{expr}}>$0", mode: "word" },
    { name: "uniqueptr", description: "", body: "std::unique_ptr<{{expr}}>$0", mode: "word"},
    { name: "weakptr", description: "", body: "std::weak_ptr<{{expr}}>$0", mode: "word" },

    { name: "makeshared", description: "", body: "std::make_shared<{{expr}}>($1)$0", mode: "word" },
    { name: "makeunique", description: "", body: "std::make_unique<{{expr}}>($1)$0", mode: "word" },
    { name: "move", description: "", body: "std::move({{expr}})", mode: "word" },
    { name: "forward", description: "", body: "std::forward<$1>({{expr}})$0", mode: "word" },

    { name: "vector", description: "", body: "std::vector<{{expr}}>$0", mode: "word" },
    { name: "map", description: "", body: "std::map<{{expr}}>$0", mode: "word" },
    { name: "set", description: "", body: "std::set<{{expr}}>$0", mode: "word" },
    { name: "unordmap", description: "", body: "std::unordered_map<{{expr}}>$0", mode: "word" },
    { name: "unordset", description: "", body: "std::unordered_set<{{expr}}>$0", mode: "word" },

    { name: "cast(static)", description: "static_cast", body: "static_cast<$1>({{expr}})$0", mode: "word" },
    { name: "cast(reinterpret)", description: "reinterpret_cast", body: "reinterpret_cast<$1>({{expr}})$0", mode: "word" },
    { name: "std", description: "Add std namespace", body: "std::{{expr}}", mode: "word" },
)

class ImplTemplate extends BaseTemplate implements IPostfixTemplate {

    constructor(public name: string, public description: string, public body: string, public mode: string) {
        super(name, description, body, mode)
    }
   canUse(inlineText: string): boolean {
        return true
    }
}
