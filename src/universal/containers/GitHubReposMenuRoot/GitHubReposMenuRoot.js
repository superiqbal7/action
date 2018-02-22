/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import React from 'react';
import {TransitionGroup} from 'react-transition-group';
import AnimatedFade from 'universal/components/AnimatedFade';
import LoadingComponent from 'universal/components/LoadingComponent/LoadingComponent';
import withAtmosphere from 'universal/decorators/withAtmosphere/withAtmosphere';
import GitHubRepoListMenu from 'universal/modules/outcomeCard/components/GitHubRepoListMenu/GitHubRepoListMenu';
import GitHubRepoAddedSubscription from 'universal/subscriptions/GitHubRepoAddedSubscription';
import GitHubRepoRemovedSubscription from 'universal/subscriptions/GitHubRepoRemovedSubscription';
import IntegrationJoinedSubscription from 'universal/subscriptions/IntegrationJoinedSubscription';
import IntegrationLeftSubscription from 'universal/subscriptions/IntegrationLeftSubscription';
import ProviderAddedSubscription from 'universal/subscriptions/ProviderAddedSubscription';
import ProviderRemovedSubscription from 'universal/subscriptions/ProviderRemovedSubscription';
import {DEFAULT_TTL, GITHUB} from 'universal/utils/constants';
import ErrorComponent from 'universal/components/ErrorComponent/ErrorComponent';
import GitHubMemberRemovedSubscription from 'universal/subscriptions/GitHubMemberRemovedSubscription';
import QueryRenderer from 'universal/components/QueryRenderer/QueryRenderer';

const githubRepoQuery = graphql`
  query GitHubReposMenuRootQuery($teamId: ID!) {
    viewer {
      ...GitHubRepoListMenu_viewer
    }
  }
`;


const subscriptions = [
  GitHubRepoAddedSubscription,
  GitHubRepoRemovedSubscription,
  GitHubMemberRemovedSubscription,
  ProviderRemovedSubscription,
  ProviderAddedSubscription,
  IntegrationLeftSubscription(GITHUB),
  IntegrationJoinedSubscription(GITHUB)

];

const cacheConfig = {ttl: DEFAULT_TTL};

const GitHubReposMenuRoot = (rootProps) => {
  const {
    area,
    atmosphere,
    handleAddTask,
    taskId,
    setError,
    clearError,
    closePortal,
    updateModalCoords,
    maxWidth
  } = rootProps;
  const [teamId] = taskId.split('::');
  return (
    <QueryRenderer
      cacheConfig={cacheConfig}
      environment={atmosphere}
      query={githubRepoQuery}
      variables={{teamId, service: GITHUB}}
      subscriptions={subscriptions}
      render={({error, props}) => {
        // TODO refactor animation into a wrapper and GitHubRepoListMenu is the child
        return (
          <TransitionGroup appear component={null}>
            {error && <ErrorComponent height={'14rem'} width={maxWidth} error={error} />}
            {props && <AnimatedFade key="1" onEnter={updateModalCoords}>
              <GitHubRepoListMenu
                area={area}
                handleAddTask={handleAddTask}
                viewer={props.viewer}
                teamId={teamId}
                taskId={taskId}
                closePortal={closePortal}
                setError={setError}
                clearError={clearError}
              />
            </AnimatedFade>}
            {!props && !error &&
            <AnimatedFade key="2" unmountOnExit exit={false}>
              <LoadingComponent height={'5rem'} width={maxWidth} />
            </AnimatedFade>
            }
          </TransitionGroup>
        );
      }}
    />
  );
};

GitHubReposMenuRoot.propTypes = {
  area: PropTypes.string,
  atmosphere: PropTypes.object.isRequired,
  handleAddTask: PropTypes.func,
  maxWidth: PropTypes.number.isRequired,
  taskId: PropTypes.string.isRequired,
  viewer: PropTypes.object,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  closePortal: PropTypes.func.isRequired,
  updateModalCoords: PropTypes.func.isRequired
};

export default withAtmosphere(GitHubReposMenuRoot);
