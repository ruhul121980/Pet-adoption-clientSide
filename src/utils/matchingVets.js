export function findVetsWithUserMeetings(vets, userId) {
    const matchingVets = [];
  
    for (const vet of vets) {
      for (const meeting of vet.meeting) {
        if (meeting.userId === userId) {
          matchingVets.push(vet);
          break; // Stop iterating through vet.meeting after a match is found
        }
      }
    }
  
    return matchingVets;
  }