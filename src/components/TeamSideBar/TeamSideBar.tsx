import { Dispatch, SetStateAction, useContext } from "react";
import { ChannelModel } from "../../models/ChannelModel";
import { FaRocketchat } from "react-icons/fa";
import { MdOutlineVoiceChat } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { createMeeting } from "../../services/meeting.service";
import { TeamAppContext } from "../../store/team.context";
import { UserAppContext } from "../../store/user.context";
import { defaultTeamImgUrl } from "../../common/constants";
import { MeetingParticipantModel } from "../../models/MeetingParticipantModel";
import { DyteAppContext } from "../../store/Dyte/dyte.context";
import { getTeamById } from "../../services/team.service";
import { PiSpeakerSimpleSlashLight } from "react-icons/pi";
import { CiVideoOn } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { LuScreenShare } from "react-icons/lu";
type TeamSideBarProps = {
  teamName: string;
  setChannel: Dispatch<SetStateAction<ChannelModel | null>>;
  teamChannels: ChannelModel[];
  setIsNamePrivacyModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsChannelDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const TeamSideBar: React.FC<TeamSideBarProps> = ({
  teamName,
  setChannel,
  teamChannels,
  setIsNamePrivacyModalOpen,
  setIsChannelDeleteModalOpen,
}): JSX.Element => {
  const { team } = useContext(TeamAppContext);

  const { user } = useContext(UserAppContext);
  const { authToken, setAuthToken } = useContext(DyteAppContext);
  const meetingParticipant = {
    username: user?.username,
    customParticipantId: "string",
    name: user?.displayName,
    pictureUrl: user?.avatarUrl || defaultTeamImgUrl,
    createdAt: "string",
    token: "string",
  } as MeetingParticipantModel;
  const handleVoiceChannel = async (teamName: string) => {
    try {
      const authToken = await createMeeting({
        meetingName: `${teamName}`,
        teamId: `${team?.teamId}`,
        participant: meetingParticipant,
      });
      setAuthToken(authToken ? authToken : "");
      if (team) {
        const updatedTeam = await getTeamById(team.teamId);
        console.log("updatedTeam", updatedTeam);
      }
      console.log("authToken", authToken);
    } catch (error) {
      console.error("Cannot create/join meeting!", error);
    }
  };
  // useEffect(() => {
  //   console.log("authToken in useEffect", authToken);
  // }, [authToken]);
  return (
    <div className="border-base-300 flex-col justify-center px-4 bg-base-100 h-full w-60 shadow-lg shadow-primary relative">
      <div className="collapse !overflow-visible">
        <input type="checkbox" />
        <div className="collapse-title z-0 text-xl font-medium">
          Text Channels
        </div>
        <div className="collapse-content">
          {teamChannels.map(channel => (
            <div
              key={channel?.id}
              className="flex flex-row rounded-md my-2 p-0 w-full"
            >
              <div className="flex justify-between w-full items-center">
                <button
                  onClick={() => setChannel(channel)}
                  className="btn btn-sm btn-outline btn-primary text-sm "
                >
                  <span className="icon text-secondary">
                    <FaRocketchat />
                  </span>
                  <span className="break-words truncate max-w-24">
                    {channel.name}
                  </span>
                </button>
                <div className="dropdown dropdown-bottom dropdown-start">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm m-1 bg-transparent border-none hover:bg-transparent hover:border-none shadow-none"
                    onClick={() => setChannel(channel)}
                  >
                    <IoMdSettings />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu-sm bg-base-100 rounded-box z-[40] w-52 p-2 shadow"
                  >
                    <li>
                      <button
                        className="btn btn-ghost btn-sm w-full"
                        onClick={() => {
                          setIsNamePrivacyModalOpen(true), setChannel(channel);
                        }}
                      >
                        Name & privacy
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-ghost btn-sm w-full"
                        onClick={() => {
                          setIsChannelDeleteModalOpen(true),
                            setChannel(channel);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {teamName && (
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Voice Channel
          </div>
          <div className="collapse-content flex flex-row">
            <button
              className="btn btn-sm btn-outline btn-primary text-sm hover:bg-gray-700 mb-3"
              onClick={() => {
                handleVoiceChannel(teamName);
              }}
            >
              <span className="mr-2 text-lg">
                <MdOutlineVoiceChat className="text-secondary" />
              </span>
              Audio/Video Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeamSideBar;
