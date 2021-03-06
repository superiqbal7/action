import {GraphQLObjectType} from 'graphql'
import agendaItemSubscription from 'server/graphql/subscriptions/agendaItemSubscription'
import githubRepoAdded from 'server/graphql/subscriptions/githubRepoAdded'
import githubRepoRemoved from 'server/graphql/subscriptions/githubRepoRemoved'
import githubMemberRemoved from 'server/graphql/subscriptions/githubMemberRemoved'
import integrationJoined from 'server/graphql/subscriptions/integrationJoined'
import integrationLeft from 'server/graphql/subscriptions/integrationLeft'
import newAuthToken from 'server/graphql/subscriptions/newAuthToken'
import notificationSubscription from 'server/graphql/subscriptions/notificationSubscription'
import organizationSubscription from 'server/graphql/subscriptions/organizationSubscription'
import taskSubscription from 'server/graphql/subscriptions/taskSubscription'
import slackChannelAdded from 'server/graphql/subscriptions/slackChannelAdded'
import slackChannelRemoved from 'server/graphql/subscriptions/slackChannelRemoved'
import teamMemberSubscription from 'server/graphql/subscriptions/teamMemberSubscription'
import teamSubscription from 'server/graphql/subscriptions/teamSubscription'
import integrationSubscription from 'server/graphql/subscriptions/integrationSubscription'

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    agendaItemSubscription,
    githubMemberRemoved,
    githubRepoAdded,
    githubRepoRemoved,
    integrationSubscription,
    integrationJoined,
    integrationLeft,
    newAuthToken,
    notificationSubscription,
    organizationSubscription,
    taskSubscription,
    slackChannelAdded,
    slackChannelRemoved,
    teamSubscription,
    teamMemberSubscription
  })
})
