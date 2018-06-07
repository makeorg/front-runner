const defaultMetas = {
  title: "Make.org, accélérateur d'intérêt collectif",
  description: "Proposez, votez, agissons : ensemble, trouvons des solutions aux grandes problématiques actuelles. Les plus soutenues seront mises en action par Make.org et ses partenaires.",
  picture: "https://uploads-ssl.webflow.com/598345cdee443e00013ae603/59a526e0a1a95c0001f8ca11_make.png"
};

function myProposal(contextName, proposalContent) {
    return {
      ...defaultMetas,
      title: "Soutenez ma proposition sur Make.org",
      description: "Sur le sujet " + contextName + " je propose «" + proposalContent + "».",
    };
}

function proposal(contextName, authorName, proposalContent) {
    return {
      ...defaultMetas,
      title: "Comme moi, soutenez cette proposition sur Make.org",
      description: "Sur le sujet " + contextName + ", " + authorName + " propose «" + proposalContent + "».\nComme moi, soutenez la ou réagissez en votant sur Make.org !",
    };
}

module.exports = {
    default: defaultMetas,
    myProposal: myProposal,
    proposal: proposal
};