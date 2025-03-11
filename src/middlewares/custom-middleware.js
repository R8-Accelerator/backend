module.exports = () => {
  return async (ctx, next) => {
    await next();

    if (
      ctx.request.url.includes("/api/auth/local/register") &&
      ctx.response.status === 200
    ) {
      const role = getQueryParams(ctx.request.url);
      const { services } = strapi.plugins["users-permissions"];
      const roles = await services.role.find();
      const selectedRole = roles.find((r) => r.type === role);
      const updateData = { role: selectedRole.id };
      await strapi.plugins["users-permissions"].services.user.edit(
        ctx.response.body.user.id,
        updateData
      );
    }
  };
};

function getQueryParams(url) {
  const match = /[\?&]role=([^&#]*)/.exec(url);
  const role = match && decodeURIComponent(match[1].replace(/\+/g, " "));

  return role;
}
